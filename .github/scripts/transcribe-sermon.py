#!/usr/bin/env python3
"""
Transcribe a recorded sermon into reviewable text.

The ministry preaches far more than it writes, and the site helper can only
quote what exists as text. This turns an audio recording into a transcript a
person can then edit into teaching -- it is the first half of that job, not the
whole of it.

**The output is a draft.** Speech recognition mishears, and it mishears the
words this ministry uses most: Yeshua, tzitzit, parashat, Shavuot. The
corrections below fix the mistakes we know about, and the transcript is written
with a banner saying plainly that a person still has to read it.

Usage:
    python3 .github/scripts/transcribe-sermon.py sermons/audio/my-sermon.mp3

Writes `sermons/transcripts/my-sermon.md`, and refuses if that file already
exists -- a transcript someone has read and corrected is worth more than the
recording, and there is no getting that editing back. Set ALLOW_OVERWRITE=true
to replace one on purpose.
"""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path

MODEL_SIZE = os.environ.get("WHISPER_MODEL", "small.en")

# Longest silence, in seconds, that still belongs to the same paragraph. Speech
# recognition returns a stream of short segments; grouping them on the pauses a
# preacher actually takes gives something closer to readable prose.
PARAGRAPH_PAUSE = 2.0

# Roughly the length of a blog paragraph. A wall of text is no use to whoever
# has to edit this afterwards.
MAX_PARAGRAPH_CHARS = 700

# What speech recognition hears instead of the ministry's own vocabulary.
#
# Seeded from the words the blog uses most and the ways an English model
# usually renders them. It will be wrong in ways nobody has predicted, so
# **add to it whenever you spot a new mishearing in a transcript** -- that is
# how this gets better, and it is much cheaper than fixing the same word by
# hand in every sermon.
CORRECTIONS: dict[str, str] = {
    r"\bYeshu[ao]h?\b": "Yeshua",
    r"\bY'?shua\b": "Yeshua",
    r"\bJoshua\b(?= the Messiah| our Messiah)": "Yeshua",
    r"\bYahoshua\b": "Yehoshua",
    r"\bzitzit\b": "tzitzit",
    r"\btsi ?tsit\b": "tzitzit",
    r"\bsee ?see ?it\b": "tzitzit",
    r"\bpar ?a ?shot\b": "parashat",
    r"\bporsche ?shot\b": "parashat",
    r"\bparasha[ht]?\b": "parashat",
    r"\bshabbos\b": "Shabbat",
    r"\bsha ?bat\b": "Shabbat",
    r"\bshavuos\b": "Shavuot",
    r"\bsha ?voo ?ot\b": "Shavuot",
    r"\bsukkos\b": "Sukkot",
    r"\bsoo ?coat\b": "Sukkot",
    r"\brosh ha ?shana[h]?\b": "Rosh Hashanah",
    r"\byom kipper\b": "Yom Kippur",
    r"\bhanuka[h]?\b": "Hanukkah",
    r"\bshofa[r]?\b": "shofar",
    r"\bamalek[h]?\b": "Amalek",
    r"\bmelchizedek\b": "Melchizedek",
    r"\bjeshurun\b": "Jeshurun",
    r"\bsameach\b": "Sameach",
    r"\bnachamu\b": "Nachamu",
    r"\btorah\b": "Torah",
    r"\bmessiah\b": "Messiah",
}


def apply_corrections(text: str) -> str:
    """Fix the mishearings we know about, preserving sentence capitalization."""
    for pattern, replacement in CORRECTIONS.items():
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)
    return text


def to_paragraphs(segments) -> list[str]:
    """Group recognized segments into paragraphs on the speaker's own pauses."""
    paragraphs: list[str] = []
    current: list[str] = []
    previous_end = 0.0

    for segment in segments:
        text = segment.text.strip()
        if not text:
            continue
        gap = segment.start - previous_end
        too_long = sum(len(part) for part in current) > MAX_PARAGRAPH_CHARS
        if current and (gap >= PARAGRAPH_PAUSE or too_long):
            paragraphs.append(" ".join(current))
            current = []
        current.append(text)
        previous_end = segment.end

    if current:
        paragraphs.append(" ".join(current))
    return paragraphs


BANNER = """<!--
  DRAFT TRANSCRIPT -- not published, and not quotable as it stands.

  Produced by .github/scripts/transcribe-sermon.py from {source}.
  Model: {model}.

  Before any of this reaches the site it needs a person to:
    1. Read it against the recording and fix what was misheard. Add any new
       mishearing to CORRECTIONS in the script so it is fixed everywhere.
    2. Cut it into sections with a bold heading each, the way the blog posts
       are written -- the site helper quotes a paragraph at a time, and an
       unheaded wall of speech quotes badly.
    3. Trim the asides and repetitions that belong to speaking, not reading.
-->
"""


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__.strip(), file=sys.stderr)
        return 2

    source = Path(sys.argv[1])
    if not source.is_file():
        print(f"::error::No such audio file: {source}", file=sys.stderr)
        return 1

    destination = Path("sermons/transcripts") / f"{source.stem}.md"
    if destination.exists() and os.environ.get("ALLOW_OVERWRITE") != "true":
        # Whoever ran this again almost certainly did not mean to throw away
        # the corrections and headings someone put into the existing file by
        # hand -- that editing is most of the work, and it cannot be recovered
        # from the recording.
        print(
            f"::error::{destination} already exists. Transcribing again would "
            "overwrite it, losing any corrections made by hand. Re-run with "
            "the 'overwrite' input set to true if that is really what you want.",
            file=sys.stderr,
        )
        return 1

    from faster_whisper import WhisperModel

    print(f"Loading {MODEL_SIZE} ...", file=sys.stderr)
    model = WhisperModel(MODEL_SIZE, device="cpu", compute_type="int8")

    print(f"Transcribing {source.name} ...", file=sys.stderr)
    segments, info = model.transcribe(str(source), beam_size=5, vad_filter=True)
    paragraphs = [apply_corrections(p) for p in to_paragraphs(segments)]

    if not paragraphs:
        print("::error::No speech was recognized in this file.", file=sys.stderr)
        return 1

    destination.parent.mkdir(parents=True, exist_ok=True)
    minutes = int(info.duration // 60)
    destination.write_text(
        BANNER.format(source=source.as_posix(), model=MODEL_SIZE)
        + f"\n# {source.stem.replace('-', ' ').title()}\n\n"
        + f"_Draft transcript of {minutes} minutes of audio. Needs review._\n\n"
        + "\n\n".join(paragraphs)
        + "\n",
        encoding="utf-8",
    )

    words = sum(len(p.split()) for p in paragraphs)
    print(f"Wrote {destination} -- {len(paragraphs)} paragraphs, ~{words} words.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

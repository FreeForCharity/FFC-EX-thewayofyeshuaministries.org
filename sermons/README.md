# Sermons

Recordings and their transcripts. Neither is published on the site.

## How a sermon becomes something the site can quote

1. **Drop the recording** in `sermons/audio/` and push. Any common format works
   (`.mp3`, `.m4a`, `.wav`, ...). Long sermons are fine; split files are fine.
2. **A draft transcript appears** in `sermons/transcripts/`, committed by the
   `Transcribe Sermon` workflow. A 45-minute sermon takes about 15 minutes.
3. **Read it.** Speech recognition mishears, most of all the words this
   ministry uses most. When you find a mistake it made, fix the transcript —
   and if it is a word it will get wrong again, add it to `CORRECTIONS` in
   `.github/scripts/transcribe-sermon.py` so it is fixed everywhere from then on.
4. **Cut it into sections**, each with a bold heading, the way the blog posts
   are written. This is the step that matters most: the site helper quotes one
   paragraph at a time, and an unheaded run of speech quotes badly. Trim the
   asides and repetitions that belong to speaking rather than reading.

A transcript is only wired into the site helper once a person has done steps 3
and 4. Nothing here reaches a visitor automatically.

## Why the audio lives in the repository

It is the simplest thing that works: no accounts, no storage to pay for, and
the recording sits beside the words taken from it. If the repository ever grows
uncomfortably large, the recordings can be moved out — the transcripts are what
the site needs.

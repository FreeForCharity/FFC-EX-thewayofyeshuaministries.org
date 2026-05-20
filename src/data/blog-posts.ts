export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'shavuot-get-together',
    title: 'Join Us for a Shavuot Get-Together',
    date: '2026-05-20',
    excerpt:
      'Shavuot begins at sundown on Thursday, May 21, 2026. Join The Way of Yeshua Ministries for a get-together to celebrate the giving of the Torah and the outpouring of the Holy Spirit.',
    body: [
      'Shalom and blessings! <strong>Shavuot</strong> &mdash; the Feast of Weeks, also called Pentecost &mdash; begins at sundown on <strong>Thursday, May 21, 2026</strong> and continues through nightfall on Saturday, May 23.',
      'Shavuot is one of the three pilgrimage feasts the Lord set apart in His Word (Leviticus 23:15-22, Deuteronomy 16:9-12). It marks the day God gave the Torah to Israel at Mount Sinai &mdash; and, in the book of Acts, the day the Holy Spirit was poured out on the disciples of Yeshua in Jerusalem (Acts 2). The same feast carries both moments: the Word written on stone, and the Word written on our hearts.',
      'In honor of this appointed time, <strong>The Way of Yeshua Ministries is hosting a Shavuot get-together</strong>. Come share in fellowship, Scripture, prayer, and a meal together &mdash; following the long-standing tradition of celebrating Shavuot with dairy foods, sweet things, and the joy of community.',
      '<strong>How to join us:</strong> we&rsquo;d love to have you. Because seating and food are limited, please <strong>RSVP</strong> so we can plan well and share the time and location with you. Reach out by phone or email:',
      '&nbsp;&nbsp;&bull; Phone: <a href="tel:5203024034" class="text-[#C9A24B] hover:underline">(520) 302-4034</a><br />&nbsp;&nbsp;&bull; Email: <a href="mailto:Info@thewayofyeshuaministries.org" class="text-[#C9A24B] hover:underline">Info@thewayofyeshuaministries.org</a>',
      'Whether you have walked with Yeshua for many years or are simply curious about how the feasts of the Lord point to the Messiah, you are welcome. Bring a friend, bring a hungry heart, and come ready to lift up His Name together.',
      '<em>&ldquo;You shall count seven full weeks &hellip; then you shall present a grain offering of new grain to the Lord.&rdquo;</em> &mdash; Leviticus 23:15-16',
      'Chag Shavuot Sameach! May the Lord meet you in His Word and pour out His Spirit afresh on you this season.',
    ],
  },
  {
    slug: 'blessings',
    title: 'Blessings',
    date: '2026-01-27',
    excerpt: 'Baruch HaShem! May the Lord bless you this day and move you in His grace.',
    body: [
      'Baruch HaShem! May the Lord bless you this day and move you in His grace.',
      'No matter what is going on He is there to talk to you. Just lift up His Name in prayer.',
      'Blessings and Shalom',
    ],
  },
  {
    slug: 'sermon-of-the-day',
    title: 'Sermon Of The Day',
    date: '2025-12-21',
    excerpt:
      'Today I want to talk about works for Yeshua. Our works are directly linked to our light for Yeshua that the world sees.',
    body: [
      'Blessings to everyone. Today I want to talk about works for Yeshua.',
      'For too long we repeat You are saved by faith not of work, lest one should boast.',
      'And we neglect James where he states our faith is shown by our works.',
      'I am by no means saying works matter for our eternal salvation. That is done in Yeshua alone. However our works are directly linked to our light for Yeshua that the world sees! We are called unto good works and we are the workmanship of God!',
      'So what are you doing to be a light for Messiah today?',
      'Yeshua tells us that we show our love for Him and God by obeying His Commandments. But what exactly is He talking about? Well Yeshua tells us to Love the Lord and our neighbor. However, it does not end there. Scripture is full of instructions for holy living and we can see examples of how we can fulfill the commandments of God.',
      'Look to the parables of Yeshua, specifically the parable of the Good Samaritan. We see someone hurting and we act. How difficult is that? There are those in need all around us. It can actually become overwhelming, when we look enmass. However in my life, the Holy Spirit has spoken to me about specific individuals or situations where I am called to act. But what if I was not listening to or willing to hear that voice? I would miss my opportunity to be a light for Yeshua. How many times have I been caught up in myself or my own drama, only to miss an opportunity? I can tell you its more often than it should be! What about you? Can you truthfully look at your opportunities and say you have heeded to yearnings of the Holy Spirit? Or do we say, someone else will heed the call? Or I&rsquo;ll do it later?',
      'So my challenge to myself and to you are to analyze opportunities. See where you can be the hands and feet of Yeshua here on earth. Be a light for Yeshua that outshines outshine the darkness are sunounded by!',
      'Show your love for God and all those around you trough good works unto Lord!',
      'Have a blessed day!',
    ],
  },
  {
    slug: 'the-way-of-yeshua-ministries-statement-of-faith',
    title: 'The Way Of Yeshua Ministries Statement Of Faith',
    date: '2025-12-10',
    excerpt:
      'The Way of Yeshua Ministries believes: Yeshua is the Way, the Truth, and the Life. Nobody comes to the Father except through Him.',
    body: [
      'The Way of Yeshua Ministries believes:',
      '1. Yeshua is the Way, Truth, and the Life. Nobody comes to the Father except through Him. (John 14:6)',
      '2. Yeshua, the incarnate form of God, was born by the Holy Spirit, through virgin Mary. (Matthew 1:18)',
      '3. Yeshua died on the cross for the sins of the world, to reconcile man (Colossians 1:20)',
      '4. All have sinned and fallen short of the glory of God. (Romans 3:23)',
      '5. The gift of Salvation is by God&rsquo;s Grace, through faith. (Ephesians 2:8)',
      '6. Salvation is found in the name of Yeshua. (Acts 4:12)',
      '7. Followers of Yeshua are called unto good works. (James 2:18, II Corinthians 9:8)',
      '8. Yeshua died on the cross and was raised from the dead. (Mark 16:6)',
      '9. All followers of Yeshua are to share His Gospel to all the world. (Matthew 28:19-20)',
      '10. The resurrected Yeshua will return for His church. (I Thessalonians 4:16)',
      '11. Followers of Yeshua are instructed concerning our lives, homes, and behavior through the Holy Scriptures, God&rsquo;s Word to man. (II Timothy 3:16-17)',
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

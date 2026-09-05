import { useMemo } from 'react'

const QUESTIONS = [
  {
    q: 'Do I need an account to browse homes?',
    a: 'No. You can search, open listings, and save a shortlist on this device without signing in. Create an account when you want to publish a home or message an owner.',
  },
  {
    q: 'How do I contact the owner?',
    a: 'Open a listing and use Contact owner. You will write a short note and send it from your email app.',
  },
  {
    q: 'Are prices listed in US dollars?',
    a: 'Yes. Sale prices and monthly rent appear in US dollars as entered by the person who posted the home.',
  },
  {
    q: 'What does an offer price mean?',
    a: 'An offer is a reduced price the owner posted. The listing still shows the original price so you can see the difference.',
  },
  {
    q: 'Can I list a home I own?',
    a: 'Yes. Sign in, open your account, and choose Create listing. Add photos, price, and amenities, then publish.',
  },
  {
    q: 'How current are the photos?',
    a: 'Photos come from the person who posted the home. If a listing looks outdated, message the owner and ask for a recent set before you visit.',
  },
  {
    q: 'Where are my saved homes stored?',
    a: 'Without an account, the heart saves a shortlist on this browser. After you sign in, that list is stored with your account so it can follow you to another device.',
  },
  {
    q: 'What cookies does the site use?',
    a: 'We use a session cookie so you stay signed in, and local storage for your shortlist and cookie choice. There are no advertising pixels on these pages.',
  },
]

export default function FaqSection() {
  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: QUESTIONS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    }),
    []
  )

  return (
    <section className="mx-auto max-w-[680px] px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <h2 className="text-3xl font-semibold">Questions before you search</h2>
      <div className="mt-8 space-y-3">
        {QUESTIONS.map((item) => (
          <details key={item.q} className="surface-card p-4">
            <summary className="cursor-pointer font-semibold">{item.q}</summary>
            <p className="mt-3 text-pretty text-sm text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

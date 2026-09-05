import { useEffect, useRef, useState } from 'react'

const WORDS = [
  'Walk',
  'the',
  'rooms',
  'from',
  'your',
  'sofa.',
  'Tour',
  'in',
  'person',
  'when',
  'it',
  'feels',
  'right.',
]

export default function TaglineReveal() {
  const sectionRef = useRef(null)
  const wordRefs = useRef([])
  const [activeCount, setActiveCount] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setActiveCount(WORDS.length)
      return
    }

    const nodes = wordRefs.current.filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = Number(entry.target.dataset.wordIndex)
          setActiveCount((current) => Math.max(current, index + 1))
        })
      },
      { threshold: 0.7, rootMargin: '-18% 0px -55% 0px' }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-[680px] px-4 py-16 sm:py-24"
      aria-label="Brand promise"
    >
      <p className="text-4xl font-semibold leading-10 sm:text-5xl sm:leading-none">
        {WORDS.map((word, index) => (
          <span
            key={`${word}-${index}`}
            ref={(el) => {
              wordRefs.current[index] = el
            }}
            data-word-index={index}
            className="tagline-word mr-3 inline-block"
            style={{
              color: index < activeCount ? 'var(--color-ink)' : 'color-mix(in srgb, var(--color-ink) 30%, transparent)',
              transition: 'color 700ms cubic-bezier(0.32, 0.72, 0, 1)',
            }}
          >
            {word}
          </span>
        ))}
      </p>
    </section>
  )
}

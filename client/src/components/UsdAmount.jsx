import { useMemo } from 'react'

export default function UsdAmount({ value, suffix = '' }) {
  const formatted = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(Number(value) || 0),
    [value]
  )

  return (
    <span className="tabular">
      {formatted}
      {suffix}
    </span>
  )
}

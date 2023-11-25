import React from 'react'

const Star = ({ rating }: { rating: number | null }) => (
  <i data-star={(rating || 0) / 2} />
)

export default Star

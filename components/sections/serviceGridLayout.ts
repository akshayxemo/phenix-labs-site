const darkCardAnchors = [0.18, 0.5, 0.82, 0.32, 0.68]

/** Builds a repeating two-card / three-card row rhythm. */
export function getAlternatingServiceSpans(total: number) {
  const spans: number[] = []
  let remaining = total
  let rowIndex = 0

  while (remaining > 0) {
    const intendedCards = rowIndex % 2 === 0 ? 2 : 3
    const cardsInRow = Math.min(intendedCards, remaining)

    if (cardsInRow === 1) {
      spans.push(12)
    } else if (cardsInRow === 2) {
      spans.push(...(rowIndex % 2 === 0 ? [7, 5] : [5, 7]))
    } else {
      spans.push(4, 4, 4)
    }

    remaining -= cardsInRow
    rowIndex += 1
  }

  return spans
}

/**
 * Selects one dark card per completed 12-column row and moves that emphasis
 * across the grid, avoiding a rigid repeated-column pattern.
 */
export function getMosaicDarkIndexes(spans: number[]) {
  const darkIndexes = new Set<number>()
  let itemIndex = 0
  let rowIndex = 0

  while (itemIndex < spans.length) {
    const rowStart = itemIndex
    let occupiedColumns = 0

    while (itemIndex < spans.length && occupiedColumns < 12) {
      occupiedColumns += spans[itemIndex]
      itemIndex += 1
    }

    const targetAnchor = darkCardAnchors[rowIndex % darkCardAnchors.length]
    let currentColumns = 0
    let selectedIndex = rowStart
    let closestDistance = Number.POSITIVE_INFINITY

    for (let index = rowStart; index < itemIndex; index += 1) {
      const cardCenter = (currentColumns + spans[index] / 2) / 12
      const distance = Math.abs(cardCenter - targetAnchor)

      if (distance < closestDistance) {
        selectedIndex = index
        closestDistance = distance
      }

      currentColumns += spans[index]
    }

    darkIndexes.add(selectedIndex)
    rowIndex += 1
  }

  return darkIndexes
}

type ProcessedPrompt = {
  recipientName?: string
  title?: string
  description?: string
  issuerName?: string
  date?: string
  signature?: string
}

export function processPrompt(prompt: string): ProcessedPrompt {
  const result: ProcessedPrompt = {}

  // Extract recipient name if present
  const nameMatch = prompt.match(/for\s+([A-Za-z\s]+?)(?:,|\s+on|\s+in|\s+from|\s+at|\s+by|\s+to|\s+$)/i)
  if (nameMatch && nameMatch[1].trim().length > 0) {
    result.recipientName = nameMatch[1].trim()
  }

  // Extract certificate title
  const titlePatterns = [
    /certificate\s+of\s+([A-Za-z\s]+)/i,
    /([A-Za-z\s]+)\s+certificate/i,
    /([A-Za-z\s]+)\s+award/i,
    /diploma\s+(?:of|in|for)\s+([A-Za-z\s]+)/i,
  ]

  for (const pattern of titlePatterns) {
    const match = prompt.match(pattern)
    if (match && match[1]) {
      result.title = `Certificate of ${match[1].trim()}`
      break
    }
  }

  // Extract description
  const descriptionPatterns = [
    /for\s+(completing|achieving|participating\s+in|winning)\s+([^,.]+)/i,
    /in\s+recognition\s+of\s+([^,.]+)/i,
    /to\s+recognize\s+([^,.]+)/i,
    /has\s+(successfully|excellently)\s+([^,.]+)/i,
  ]

  for (const pattern of descriptionPatterns) {
    const match = prompt.match(pattern)
    if (match) {
      result.description = match[0].trim()
      break
    }
  }

  // Extract issuer
  const issuerPatterns = [
    /issued\s+by\s+([A-Za-z\s]+)/i,
    /from\s+([A-Za-z\s]+)/i,
    /by\s+([A-Za-z\s]+?)(?:,|\s+on|\s+in|\s+$)/i,
    /presented\s+by\s+([A-Za-z\s]+)/i,
  ]

  for (const pattern of issuerPatterns) {
    const match = prompt.match(pattern)
    if (match && match[1]) {
      result.issuerName = match[1].trim()
      break
    }
  }

  // Extract date if present
  const datePatterns = [
    /on\s+([A-Za-z]+\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4})/i,
    /dated\s+([A-Za-z]+\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4})/i,
    /(\d{1,2}\/\d{1,2}\/\d{2,4})/,
  ]

  for (const pattern of datePatterns) {
    const match = prompt.match(pattern)
    if (match && match[1]) {
      result.date = match[1].trim()
      break
    }
  }

  return result
}

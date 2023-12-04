const headingRe = /^\s*([#]+)\s*/gm

/**
 * Replace Markdown headings with specified level
 * @param body
 * @param parentLevel
 * @returns
 */
export const replaceHeadings = (body?: string, parentLevel?: number): string => {
  if (!body) {
    return ''
  }

  body = body.replace(headingRe, (match, p1) => {
    const level = p1.length
    const newLevel = level + (parentLevel || 1)
    return match.replace(p1, '#'.repeat(newLevel))
  })

  return body
}

/**
 * Format module name to slug
 *
 * e.g. `foo.bar.dar` => `foo_bar_dar`
 * @param name
 * @returns
 */
export const formatSlug = (name?: string) => {
  if (!name) {
    return ''
  }

  return name.replace(/\./g, '_')
}

/**
 * Convert a name into snake case
 *
 * e.g. `fooBar` => `foo_bar`
 */
export const snakeCase = (name?: string) => {
  if (!name) {
    return ''
  }

  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}

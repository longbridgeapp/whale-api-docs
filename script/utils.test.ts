import { expect, test } from 'bun:test'
import { formatSlug, replaceHeadings } from './utils'

test('replaceHeadings', () => {
  let body = `# Hello

  ## Example

  This is example #2 #3.

  ### This is heading3.
  `

  let expected = `### Hello

  #### Example

  This is example #2 #3.

  ##### This is heading3.
  `

  expect(replaceHeadings(body, 2)).toEqual(expected)
})

test('formatSlug', () => {
  expect(formatSlug('foo.bar.dar')).toEqual('foo_bar_dar')
  expect(formatSlug('foo.bar')).toEqual('foo_bar')
  expect(formatSlug('foo')).toEqual('foo')
  expect(formatSlug('')).toEqual('')
})

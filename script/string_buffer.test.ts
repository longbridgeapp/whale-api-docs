import { expect, test } from 'bun:test'
import { StringBuffer } from './string_buffer'

test('string buffer', () => {
  let buf = new StringBuffer()
  buf.write('hello')
  buf.write('world')
  expect(buf.toString()).toEqual('helloworld')
  expect(buf.toString(', ')).toEqual('hello, world')

  let buf1 = new StringBuffer()
  buf1.write('Foo')
  buf1.write(buf)
  buf1.write('Bar')
  expect(buf1.toString(' ')).toEqual('Foo hello world Bar')
})

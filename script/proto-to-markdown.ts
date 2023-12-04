import fs from 'fs'
import path from 'path'
import process from 'process'
import { StringBuffer } from './string_buffer'
import { Enum, Message, Method, ProtoFile, Service } from './types'
import { replaceHeadings, snakeCase } from './utils'

interface Proto {
  files: ProtoFile[]
}

const getMessage = (proto: ProtoFile, fullName: string): Message | null => {
  for (const message of proto.messages) {
    if (message.fullName == fullName) {
      return message
    }
  }
  return null
}

const getEnum = (proto: ProtoFile, name: string): Enum | null => {
  for (const enum_ of proto.enums) {
    if (enum_.name == name) {
      return enum_
    }
  }
  return null
}

const generateMethod = (proto: ProtoFile, method: Method): StringBuffer => {
  let buf = new StringBuffer()

  buf.write(`## ${method.name}\n`)
  buf.write(`${replaceHeadings(method.description, 2)}\n`)

  buf.write(`### Request\n`)
  buf.write(generateMessage(proto, method.requestFullType, { useForParameter: true }))

  buf.write(`### Response\n`)
  buf.write(generateMessage(proto, method.responseFullType, { useForParameter: true }))

  return buf
}

const generateService = (proto: ProtoFile, service: Service): StringBuffer => {
  let buf = new StringBuffer()

  buf.write(`# ${service.longName}\n`)
  buf.write(`${service.description}\n`)

  for (const method of service.methods) {
    buf.write(generateMethod(proto, method))
  }

  return buf
}

const generateFile = (proto: ProtoFile): StringBuffer => {
  console.log('Generating', proto.name)
  let buf = new StringBuffer()

  if (proto.services.length == 0) {
    console.warn(`No services found in ${proto.name}, skip.`)
    process.exit(1)
  }

  for (const service of proto.services) {
    buf.write(generateService(proto, service))
  }

  return buf
}

const generateMessage = (proto: ProtoFile, fullName: string, { useForParameter = false } = {}): StringBuffer => {
  let buf = new StringBuffer()

  if (fullName == 'google.protobuf.Empty') {
    buf.write(`Empty message\n`)
    return buf
  }

  let message = getMessage(proto, fullName)
  if (!message) {
    return buf
  }

  if (!useForParameter) {
    buf.write(`#### ${message.name}\n`)
    buf.write(`${replaceHeadings(message.description, 4)}\n`)
    buf.write(`##### Fields\n`)
  } else {
    buf.write(`${replaceHeadings(message.description, 4)}\n`)
  }

  buf.write(`**Fields**\n`)
  buf.write(`| Name | Type | Description |`)
  buf.write(`| ---- | ---- | ----------- |`)
  for (const field of message.fields) {
    buf.write(`| ${snakeCase(field.name)} | ${field.type} | ${field.description} |`)
  }
  buf.write('\n')

  return buf
}

function main() {
  const fname = './protos/proto.json'
  if (!fs.existsSync(fname)) {
    console.error('File does not exist:', fname)
    process.exit(1)
  }
  const jsonBody = fs.readFileSync(fname, 'utf8')
  let outputDir = './api/'

  const proto = JSON.parse(jsonBody) as Proto
  for (const file of proto.files) {
    const buf = generateFile(file)
    let output = path.join(outputDir, file.name + '.md')
    if (output) {
      let dir = path.dirname(output)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      fs.writeFileSync(output, buf.toString('\n'))
    }
    console.log('|- out', output)
  }
}

main()

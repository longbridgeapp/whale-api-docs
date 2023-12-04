export interface ProtoFile {
  name: string
  description: string
  package: string
  hasEnums: boolean
  hasExtensions: boolean
  hasServices: boolean
  messages: Message[]
  enums: Enum[]
  services: Service[]
}

export interface Enum {
  name: string
  longName: string
  fullName: string
  description: string
  values: EnumValue[]
}

export interface EnumValue {
  name: string
  description: string
  number: number
}

export interface Method {
  name: string
  description: string
  requestType: string
  requestLongType: string
  requestFullType: string
  requestStreaming: boolean
  responseType: string
  responseLongType: string
  responseFullType: string
  responseStreaming: boolean
}

export interface Service {
  name: string
  longName: string
  fullName: string
  description: string
  methods: Method[]
}

export interface Message {
  name: string
  longName: string
  fullName: string
  description: string
  fields: Field[]
  hasFields: boolean
  hasOneofs: boolean
}

export interface Field {
  name: string
  description: string
  label: string
  type: string
  longType: string
  fullType: string
  ismap: boolean
  isoneof: boolean
  oneofdecl: string
  defaultValue: string
}

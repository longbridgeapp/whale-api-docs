PROTOC_GEN_DOC=/Users/jason/Downloads/protoc-gen-doc
protoc --plugin=protoc-gen-doc=$PROTOC_GEN_DOC --doc_out=./protos --doc_opt=json,proto.json **/*.proto
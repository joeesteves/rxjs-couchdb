import { requestOptionsGenerator, createObservable } from './helpers'

export const init = (dbURI, headers) => {
  return [find, get, put, bulk].reduce((p, c) => {
    return { ...p, [c.name]: c(requestOptionsGenerator(dbURI, headers)) }
  }, {})
}



const find = (requestOptions) => {
  return (selector) => createObservable(requestOptions('POST', '_find', { selector }))
}

const get = (requestOptions) => {
  return (id) => createObservable(requestOptions('GET', id))
}

const put = (requestOptions) => {
  return (doc) => createObservable(requestOptions('PUT', doc._id, doc))
}

const bulk = (requestOptions) => {
  return (docs) => createObservable(requestOptions('POST', '_bulk_docs', { docs }))
}
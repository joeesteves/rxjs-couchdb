import { requestOptionsGenerator, createObservable } from './helpers'

export const init = (dbURI, headers) => {
  return {
    all: find(requestOptionsGenerator(dbURI, headers)).bind(null, {}),
    find: find(requestOptionsGenerator(dbURI, headers)),
    get: get(requestOptionsGenerator(dbURI, headers)),
    put: put(requestOptionsGenerator(dbURI, headers)),
    post: post(requestOptionsGenerator(dbURI, headers)),
    delete: drop(requestOptionsGenerator(dbURI, headers)),
    bulk: bulk(requestOptionsGenerator(dbURI, headers))

  }
}

const find = (requestOptions) => {
  return (selector = {}) => createObservable(requestOptions('POST', '_find', { selector }))
}

const get = (requestOptions) => {
  return (id) => createObservable(requestOptions('GET', id))
}

const put = (requestOptions) => {
  return (doc) => createObservable(requestOptions('PUT', doc._id, doc))
}

const post = (requestOptions) => {
  return (doc) => createObservable(requestOptions('POST', '', doc))
}

const drop = (requestOptions) => {
  return (doc) => createObservable(requestOptions('PUT', doc._id, {...doc, _deleted: true}))
}

const bulk = (requestOptions) => {
  return (docs) => createObservable(requestOptions('POST', '_bulk_docs', { docs }))
}

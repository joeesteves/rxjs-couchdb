import { requestOptionsGenerator, createObservable, createChangeObservable } from './helpers'

export const init = (dbURI, headers, interceptors) => {
  return {
    all: find(requestOptionsGenerator(dbURI, headers), interceptors).bind(null, {}),
    find: find(requestOptionsGenerator(dbURI, headers), interceptors),
    get: get(requestOptionsGenerator(dbURI, headers), interceptors),
    put: put(requestOptionsGenerator(dbURI, headers), interceptors),
    post: post(requestOptionsGenerator(dbURI, headers), interceptors),
    delete: drop(requestOptionsGenerator(dbURI, headers), interceptors),
    bulk: bulk(requestOptionsGenerator(dbURI, headers), interceptors),
    changes: changes(dbURI, headers),
    createIndex: createIndex(requestOptionsGenerator(dbURI, headers), interceptors),
  }
}

const find = (requestOptions, interceptors) => {
  return (selector = {}, opts = {}) => createObservable(requestOptions('POST', '_find', { selector, ...opts }), interceptors)
}

const get = (requestOptions, interceptors) => {
  return (id) => createObservable(requestOptions('GET', id), interceptors)
}

const changes = (dbURI, headers) => {
  return () => createChangeObservable(dbURI, headers)
}

const createIndex = (requestOptions, interceptors) => {
  return (index = {}) => createObservable(requestOptions('POST', '_index', { index }), interceptors)
}
const put = (requestOptions, interceptors) => {
  return (doc) => createObservable(requestOptions('PUT', doc._id, doc), interceptors)
}

const post = (requestOptions, interceptors) => {
  return (doc) => createObservable(requestOptions('POST', '', doc), interceptors)
}

const drop = (requestOptions, interceptors) => {
  return (doc) => createObservable(requestOptions('PUT', doc._id, { ...doc, _deleted: true }), interceptors)
}

const bulk = (requestOptions, interceptors) => {
  return (docs) => createObservable(requestOptions('POST', '_bulk_docs', { docs }), interceptors)
}

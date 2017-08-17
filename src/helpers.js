import R from 'ramda'
import Rx from 'rxjs'
import request from 'request'

export const requestOptionsGenerator = (dbURI, headers) => {
  return (method, subURI, json) => {
    return { json: json || true, ...{ method, url: `${dbURI}/${subURI}`, headers } }
  }
}

export const createObservable = (options, cb) => {
  return Rx.Observable.create(obs => {
    request(options, cb || ((error, response, body) => {
      error ? obs.error(error) : obs.next({ response, body });obs.complete()
    }))
  })
}
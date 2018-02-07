import R from 'ramda'
import Rx from 'rxjs'
import request from 'request'
import { expand } from 'rxjs/operator/expand';

export const requestOptionsGenerator = (dbURI, headers) => {
  return (method, subURI, json) => {
    return { json: json || true, ...{ method, url: `${dbURI}/${subURI}`, headers } }
  }
}

export const createObservable = (options, cb) => {
  return Rx.Observable.create(obs => {
    request(options, cb || ((error, response, body) => {
      error ? obs.error(error) : obs.next({ response, body })
      obs.complete()
    }))
  })
}

const changeRequestOptionGenerator = (dbURI, headers, last_seq) => {
  if(last_seq)
    return requestOptionsGenerator(dbURI, headers)('GET', `_changes?feed=longpoll&since=${last_seq}`)
  return requestOptionsGenerator(dbURI, headers)('GET', '_changes?descending=true&limit=1')
}

export const createChangeObservable = (dbURI, headers) => {
  return Rx.Observable.create(obs =>
      request(changeRequestOptionGenerator(dbURI, headers), (error, response, body) => {
        error ? obs.error(error) : obs.next(body.last_seq)
      })
    )
    .flatMap(last_seq => {
      return Rx.Observable
        .create(obs => {
          request(changeRequestOptionGenerator(dbURI, headers, last_seq), (error, response, body) => {
            error ? obs.error(error) : obs.next(body)
          })
        })
    })
    .expand(body => {
      return Rx.Observable
        .create(obs => {
          request(changeRequestOptionGenerator(dbURI, headers, body.last_seq), (error, response, body) => {
            error ? obs.error(error) : obs.next(body)
          })
        })
    })
}

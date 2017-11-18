# rxjs-couchdb

## Create a config file. E.g. db.js
### db.js
```js
import { init } from 'rxjs-couchdb'

const DB_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'Basic am9zZTphbGZhMTM0Ng==',
  'User-Agent': 'request'
}

 export const db = init('https://db.example.com/mydb', DB_HEADERS)

```
### in other file
```js
import {db} from './db'

db
.get({_id: 'User12345'})
.subscribe((user) => {
  console.log(user.name)
})

// find function wraps the object you pass inside { selector : ... } to avoid selector bilerplate

db
.find({user: 'ponesteves'})
.subscribe((user) => {
  console.log(user.email)
})

// if you don't pass any arguments to find it will act like db.all()

db
.find()
.subscribe((user) => {
  console.log(user.email)
})

🡩🡩🡩 equals 🡫🡫🡫

db
.all()
.subscribe((user) => {
  console.log(user.email)
})


```


Support for all, find, put and bulk also.
For bulk post you must pass an array of objects



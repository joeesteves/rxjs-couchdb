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
### other file
```js
import {db} from './db'

db
.get({_id: 'User12345'})
.subscribe((user) => {
  console.log(user.name)
})
```

Support for find, put and bulk also.
For bulk post you must pass an array of objects



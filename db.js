async function doDatabaseStuff() {
    let DB = require('nedb')
  , db = new DB({
     // these options are passed through to nedb.Datastore

     filename: './db.json',

     autoload: true // so that we don't have to call loadDatabase()
  })

  await db.insert([{
    num: 1, alpha: 'a'
  }, {
    num: 2, alpha: 'b'
  }])

  let document = await db.findOne({ num: 1 })

  // use NeDB cursors:
  let documents = await db.find({})
    .projection({ num: 1, _id: 0 })
    .exec()
}

return doDatabaseStuff()

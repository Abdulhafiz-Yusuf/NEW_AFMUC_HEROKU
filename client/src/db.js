import PouchDB from 'pouchdb';


const db = new PouchDB('afmuc')

//db.remove('Section', "5-9318008f9971f1ea5f731bd60c9041c5") //for development/testing purpose
//destroying the db for development/testing purpose
//db.destroy()

db.allDocs({ include_docs: true, })
// .then(result => console.log(result))

export default db
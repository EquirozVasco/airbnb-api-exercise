
const { MongoClient } = require("mongodb");

const uri = process.env.URI_MONGODB;

const client = new MongoClient(uri);

const conectarDB = async () => {
  await client.connect();
  let DB = client.db(process.env.DB_MONGODB);
  return DB;
}

const consultarDocumentos = async (nombreColeccion, filtro) => {
  let db = await conectarDB();
  let coleccion = db.collection(nombreColeccion);
  filtro = filtro ? filtro : {};
  return coleccion.find(filtro).limit(parseInt(process.env.DEFAULT_LIMIT_PROPERTIES)).toArray();
}

const consultarTipoPropiedad = async (nombreColeccion) => {
  let db = await conectarDB();
  let coleccion = db.collection(nombreColeccion);
  const property_type_field = {_id: 0, property_type: 1};
  return coleccion.find().project(property_type_field).toArray();
}

const reviewsTop20 = async (nombreColeccion) => {
  let db = await conectarDB();
  let coleccion = db.collection(nombreColeccion);
  const property_type_field = {_id: 0, name: 1, beds: 1, number_of_reviews: 1, price: 1};
  const sort = {number_of_reviews: -1};
  const limit = 20;
  return coleccion.find().project(property_type_field).sort(sort).limit(limit).toArray();
}

module.exports = { consultarDocumentos, consultarTipoPropiedad,reviewsTop20 }

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

/*
Con la constante 'property_type_field' indicamos en project los campos que queremos ver de la BD
*/

const consultarTipoPropiedad = async (nombreColeccion) => {
  let db = await conectarDB();
  let coleccion = db.collection(nombreColeccion);
  const property_type_field = { _id: 0, property_type: 1 };
  return coleccion.find().project(property_type_field).toArray();
}

/*
Con const sort entregamos los parámetros de cómo queremos ordenar la tabla y por cual columna.
En este caso por number_of_reviews y de forma descendente.

la const limit entrega la cantidad de registros que se van a mostrar en la petición.
*/

const reviewsTop20 = async (nombreColeccion) => {
  let db = await conectarDB();
  let coleccion = db.collection(nombreColeccion);
  const property_type_field = { _id: 0, name: 1, beds: 1, number_of_reviews: 1, price: 1 };
  const sort = { number_of_reviews: -1 };
  const limit = 20;
  return coleccion.find().project(property_type_field).sort(sort).limit(limit).toArray();
}

/*
La función topCamas tiene un comportamiento similar al de 'reviewsTop20', sin embargo en este caso particular
se recibe un parámetro adicional (limite), este sirve para indicar el número de propiedades que se quieren ver
ordenadas de forma descendente por la cantidad de camas que tienen. 
*/

const topCamas = async (nombreColeccion, limite) => {
  let db = await conectarDB();
  let coleccion = db.collection(nombreColeccion);
  if (limite != null && limite != undefined && limite != false){
    let limit = parseInt(limite);
    let property_type_field = { _id: 0, name: 1, beds: 1, number_of_reviews: 1, price: 1 };
    let sort = { beds: -1 };
    return coleccion.find().project(property_type_field).sort(sort).limit(limit).toArray();
  }else{
    throw new Error('El número de camas es obligatorio');
  }
}



module.exports = { consultarDocumentos, consultarTipoPropiedad, reviewsTop20, topCamas }

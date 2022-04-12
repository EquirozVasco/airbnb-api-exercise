
// Importar los servicio
const { consultarDocumentos, consultarTipoPropiedad, reviewsTop20 } = require('../services/mongodb.service');


const consultarAirbnb = async (req, res) => {
    let respuesta = {};
    try {
        respuesta.ok = true;
        respuesta.message = "Airbnb consultados";
        let resultado = await consultarDocumentos(process.env.COLLECTION_AIRBNB);
        respuesta.info = resultado;
        res.send(respuesta);
    } catch (error) {
        console.log(error);
        respuesta.ok = false;
        respuesta.message = "Ha ocurrido un error consultando los airbnb.";
        respuesta.info = error;
        res.status(500).send(respuesta);
    }
}

const tiposPropiedades = async (req, res) => {
    let respuesta = {};
    try {
        respuesta.ok = true;
        respuesta.message = "Tipos de propiedades consultados";
        let resultado = await consultarTipoPropiedad(process.env.COLLECTION_AIRBNB);
        respuesta.info = resultado;
        res.send(respuesta);
    } catch (error) {
        console.log(error);
        respuesta.ok = false;
        respuesta.message = "Ha ocurrido un error consultando los tipos de propiedad.";
        respuesta.info = error;
        res.status(500).send(respuesta);
    }
}

const consultarTop20Reviews = async (req, res) => {
    let respuesta = {};
    try {
        respuesta.ok = true;
        respuesta.message = "Propiedades con el top 20 de reviews consultadas";
        let resultado = await reviewsTop20(process.env.COLLECTION_AIRBNB);
        respuesta.info = resultado;
        res.send(respuesta);
    } catch (error) {
        console.log(error);
        respuesta.ok = false;
        respuesta.message = "Ha ocurrido un error consultando las propiedades.";
        respuesta.info = error;
        res.status(500).send(respuesta);
    }
}

module.exports = {
    consultarAirbnb,
    tiposPropiedades,
    consultarTop20Reviews
}
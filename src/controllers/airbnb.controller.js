
// Importar los servicio
const { consultarDocumentos, consultarTipoPropiedad, reviewsTop20, topCamas} = require('../services/mongodb.service');


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

// El controller tipos de propiedades utiliza el servicio 'consultarTipoPropiedad' para obtener el listado 
// de los diferentes tipos de propiedades
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

// El controller consultarTop20Reviews utiliza el servicio 'reviewsTop20' para consultar las 
// 20 propiedades de airbnb con mayor número de reseñas.
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

// El controller consultarTopCamas utiliza el servicio 'topCamas' para consultar las 
// {nro_beds} de propiedades que tengan mayor número de camas..
const consultarTopCamas = async (req, res) => {
    let respuesta = {};
    try {
        let limite = req.params['nro_beds'];
        respuesta.ok = true;
        respuesta.message = "Propiedades consultadas";
        let resultado = await topCamas(process.env.COLLECTION_AIRBNB, limite);
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
    consultarTop20Reviews,
    consultarTopCamas
}

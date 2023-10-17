const getDBinfo = require('../controllers/getDbInfo')
const apiData = require('../controllers/apiData');
const { Router } = require("express");

const router = Router();

router.get('/', async (req, res) => {
    const {name} = req.query; //guardo la info que obtengo por query (name)
    await apiData(); //Guardo en mi DB todos los paises.
    const DBinfo = await getDBinfo(); //obtengo la info que tengo ahora en mi DB
    
    try {
        if(!name) {

            return res.status(200).json(DBinfo);
            //si no me pasan "name" por query, devuelvo todos los paises. 
        }
        else {
            const filteredCountry = DBinfo.filter(element => element.name.toLowerCase().includes(name.toLowerCase()));
            //si si obtengo a "name" por query, hago un filter de lo que tengo en mi BD y comparo, si alguno de los nombres(propiedad name) de todos los objetos(paises) en minusculas (convertida toda la palabra en minuscula), incluye a lo que me llega en "name" tambien convertido en minuscula. ¿Por que?, para de esta forma buscar cualquier tipo de coincidencia, por ejemplo si en mi objeto de mi pais Argentina, su name es Argentina con minuscula, si me viene por query 'argent' va a devolver igual mi objeto con name "Argentina". 
                       
            return res.status(200).json(filteredCountry)
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({error:error.message});
    }
})

router.get('/:id', async(req, res) => {
    const {id} = req.params
    const DBinfo = await getDBinfo();
    try {
        if(id){
            const filterId = DBinfo.find(country => country.id === id)
            //si recibo por params un ID, me fijo con un find si encuentro coincidencia con algun ID de todos los paises que tengo en mi DB

            if (!filterId ) throw new Error('No existe el ID especificado.')
            // si no obtuve ninguna coincidencia mando un status 400 y un mensaje

            return res.status(200).json(filterId)
            // si si encuentra coincidencia, un 200 OK y el objeto que encontre.
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
 }
)

module.exports = router
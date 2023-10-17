const { Router } = require("express");
const postActivity = require('../controllers/postActivity')
const deleteActivity = require('../controllers/deleteActivity')
const {Activity} = require('../db');

const router = Router();

//POST | /activities
//Esta ruta recibirá todos los datos necesarios para crear una actividad turística y relacionarla con los países solicitados.
//Toda la información debe ser recibida por body.
//Debe crear la actividad turística en la base de datos, y esta debe estar relacionada con los países indicados (al menos uno).
router.post('/', async (req, res) => {
    const {name, difficulty, duration, season, countryId} = req.body
    try {
        const newActivity = await postActivity(name, difficulty, duration, season, countryId)
        return res.status(200).json(newActivity)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
});

//GET | /activities
//Obtiene un arreglo de objetos, donde cada objeto es una actividad turística.
router.get('/', async (req, res) => {
    try {
        const dataActivities = await Activity.findAll() //traigo todas las actividades de la DB.
        res.status(200).json(dataActivities)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
})

//DELETE | /?=name="..."
//Elimino una actividad a partir de un nombre que me pasen por query.
router.delete('/', async (req, res) => {
    const {name} = req.query;
    try {
        const isDeleted = await deleteActivity(name);
        if(isDeleted){
            return res.status(200).json({message:'Delected activity'})
        }else{
            return res.status(400).json({message: 'activity not found'})
        }
    } catch (error) {
        
    }
})
module.exports = router
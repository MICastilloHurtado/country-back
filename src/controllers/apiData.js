const { Country } = require('../db.js');
const fs = require('fs')



const apiData = async () => {
try {
    // obtengo la informacion de la Api
    const data = fs.readFileSync('./api/db.json', 'utf8');
    const countriesData = JSON.parse(data).countries;
    //iterar sobre los datos de los paises
    for await (let country of countriesData){
        //Acceder a las propiedades necesarias con sus valores predeterminados
        const continent = country.continents? country.continents[0]: 'undefined';
        const capital = country.capital?.[0] || 'undefined';
        const image = country.flags.png || 'undefined';
        const population = country.population || 'undefined'

    await Country.create({
        id:country.cca3,
        name:country.name.common,
        image:image,
        continent:continent,
        capital:capital,
        subregion:country.subregion,
        area:country.area,
        population:population
    })
    }
    
    console.log('paises guardados en la base de datos')
} catch (error) {
    console.error('Error al procesar los datos de la api', error)
}
   
}

module.exports = apiData
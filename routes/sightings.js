//access the app data 
const sightingsData = require('../sightings.json');

const searchSightings = (data, key, query) =>{
    return data.filter(sighting => 
        sighting[key].toLowerCase()===query);
};



module.exports = app => {
    app.get('/', (req,res) =>{
        res.send('Welcome to The X-Files');
    });
    
    app.get('/sightings', (req,res) =>{
        res.render('sightings/main');
    });

    app.get('/sightings/results', (req,res) =>{
        const state = req.query.state.toLowerCase();
        const city = req.query.city.toLowerCase();
        const shape = req.query.shape.toLowerCase();
        // const results = multiSearch(sightingsData, req.query.state ,req.query.city, req.query.shape);

        const results = sightingsData.filter((item) => {
            return (item.state.toLowerCase() == state || state == '') &&
                    (item.city.toLowerCase() == city || city == '') &&
                    (item.shape.toLowerCase() == shape || shape == '');
        });
       
        res.render('sightings/search', { results });
    });

    app.get('/sightings/:key/:query', (req,res) =>{
        const results = searchSightings(sightingsData, req.params.key ,req.params.query);
        res.render('sightings/search', { results });
    });
    
    //example
    //http://localhost:3000/sightings/state/ca
    //http://localhost:3000/sightings/city/lincoln
    //http://localhost:3000/sightings/shape/sphere
};
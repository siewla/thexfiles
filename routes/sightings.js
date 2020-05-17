const QUERY_DELIMITER = '&';
const KEY_VALUE_DELIMITER = '=';
const VALID_QUERY_KEYS = ['shape', 'date', 'state', 'city'];


//access the app data 
const sightingsData = require('../sightings.json');


const searchSightings = (data, key, query) =>{
    return data.filter(sighting => 
        sighting[key].toLowerCase()===query);
};

const isValidQueryKey = key =>VALID_QUERY_KEYS.includes(key);

const mapQueryData = (queryObj, key, value) => {
    if(isValidQueryKey(key)){
        queryObj[key] = value;
    }
    return queryObj;
};

const buildQueriesObject = (queries) => {
    const queriesSplit = queries.split(QUERY_DELIMITER);
    const resultsQuery ={};

    queriesSplit.forEach(query =>{
        const [key, value] = query.split(KEY_VALUE_DELIMITER);
        mapQueryData(resultsQuery, key, value);
    });
    return resultsQuery;
};

const findSightings = (queryString = '') => {
    console.log(queryString);
    const query = buildQueriesObject(queryString);
    console.log(query);
    return Object.keys(query)
        .reduce((data, filterKey) => {
            const filterValue = query[filterKey];
            return searchSightings(data, filterKey, filterValue);
        }, sightingsData);

};


module.exports = app => {
    app.get('/', (req,res) =>{
        res.render('sightings/main');
    });
    
    app.get('/sightings/', (req,res) =>{
        let queriesString = '';
        let state='';
        let city='';
        let shape='';

        if (req.query.state&&req.query.city&&req.query.shape){
            state = req.query.state.toLowerCase();
            city = req.query.city.toLowerCase();
            shape = req.query.shape.toLowerCase();
        }
        
        if (state!=='' && city!=='' && shape !==''){
            queriesString= `state=${state}&city=${city}&shape=${shape}`;
        } else if (state!==''&&city!==''&&shape===''){
            queriesString= `state=${state}&city=${city}`;
        } else if (state!==''&&city===''&&shape!==''){
            queriesString= `state=${state}&shape=${shape}`;
        } else if (state===''&&city!==''&&shape!==''){
            queriesString= `shape=${shape}&city=${city}`;
        } else if (state!==''&&city===''&&shape===''){
            queriesString= `state=${state}`;
        } else if (state===''&&city!==''&&shape===''){
            queriesString= `city=${city}`;
        } else if (state===''&&city===''&&shape!==''){
            queriesString= `shape=${shape}`;
        } 

        const results = findSightings(queriesString);
        res.render('sightings/search', { results });
    });
};
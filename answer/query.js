const QUERY_DELIMITER = "&";
const KEY_VALUE_DELIMITER = "=";
const VALID_QUERY_KEYS = ["shape", "date", "state", "city"];

const SIGHTINGS = require("../sightings.json");

//const queries = process.argv[2];
//node query.js 'shape=sphere&city=sherwood&state=ca'
const queries = "state=ca&shape=sphere";

const isValidQueryKey = (key) => VALID_QUERY_KEYS.includes(key);

const mapQueryData = (queryObj, key, value) => {
  if (isValidQueryKey(key)) {
    queryObj[key] = value;
  }
  return queryObj;
};

const searchSightings = (data, key, query) => {
  return data.filter((sighting) => sighting[key].toLowerCase() === query);
};

const buildQueriesObject = (queries) => {
  const queriesSplit = queries.split(QUERY_DELIMITER);
  const resultsQuery = {};

  queriesSplit.forEach((query) => {
    const [key, value] = query.split(KEY_VALUE_DELIMITER);
    mapQueryData(resultsQuery, key, value);
  });
  return resultsQuery;
};

const findSightings = (queryString = "") => {
  console.log(queryString);
  const query = buildQueriesObject(queryString);
  console.log(query);
  return Object.keys(query).reduce((data, filterKey) => {
    const filterValue = query[filterKey];
    return searchSightings(data, filterKey, filterValue);
  }, SIGHTINGS);
};

const search = findSightings(queries);
console.log(search);

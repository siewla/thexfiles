const moment = require("moment");

const QUERY_DELIMITER = "&";
const KEY_VALUE_DELIMITER = "=";
const VALID_QUERY_KEYS = ["date", "shape", "state", "city"];

const sightingsData = require("../sightings.json");

const searchSightings = (data, key, query) => {
  return data.filter((sighting) => {
    if (key !== VALID_QUERY_KEYS[0]) {
      return sighting[key].toLowerCase() === query.toLowerCase();
    } else {
      const formattedDate = moment(sighting[key]).format("YYYY-MM-DD");
      return moment(query).isSame(formattedDate);
    }
  });
};

const isValidQueryKey = (key) => VALID_QUERY_KEYS.includes(key);

const mapQueryData = (queryObj, key, value) => {
  if (isValidQueryKey(key)) {
    queryObj[key] = value;
  }
  return queryObj;
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

const findSightings = (queryString) => {
  const query = buildQueriesObject(queryString);
  return Object.keys(query).reduce((data, filterKey) => {
    if (query[filterKey] !== "") {
      let filterValue = query[filterKey];
      return searchSightings(data, filterKey, filterValue);
    } else {
      return data;
    }
  }, sightingsData);
};

module.exports = {
  searchSighting: (req, res) => {
    const query = req.query;
    const queryString = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join("&");

    const results = findSightings(queryString);
    res.render("sightings/search", { results, query });
  },
};

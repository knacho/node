"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _config = _interopRequireDefault(require("./config"));

var _beer = _interopRequireDefault(require("./models/beer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _config.default)();

const onSuccess = function (response) {
  return response.data;
};

const onDataExtracted = function (data) {
  return data.data;
};

const onBeers = function (beers) {
  const beerIt = beer => {
    const {
      id,
      name,
      nameDisplay,
      abv,
      isOrganic,
      isRetired,
      status,
      statusDisplay
    } = beer;
    const modelBeer = new _beer.default({
      id,
      name,
      nameDisplay,
      abv,
      isOrganic,
      isRetired,
      status,
      statusDisplay
    });
    modelBeer.save((err, savedBeer) => {
      if (err) return console.log(err); // console.log(savedBeer);
    });
    return true;
  };

  beers.forEach(beerIt);
};

const onError = function (error) {
  console.log(error);
};

const END_POINT = 'https://sandbox-api.brewerydb.com/v2/';
const BEERS = `${END_POINT}beers?key=fc4b69536c1dce367b1cf0194c7de532`;
const numberOfPages = 23;
let currentPage = 1;

const getNextBeers = () => {
  const url = `${BEERS}&p=${currentPage}`;
  console.log(url);

  _axios.default.get(url).then(onSuccess).then(onDataExtracted).then(onBeers).then(() => {
    currentPage += 1;

    if (currentPage <= numberOfPages) {
      getNextBeers();
    }
  }).catch(onError);
};

getNextBeers();
// import express from 'express';
// import config from './config.js';
// import Beer from './models/beer.js';

// config.dbConnect();

// Beer.create({ name: 'sol' }, (err, beer) => {
//  if (err) return console.log(err);
//  console.log(beer);
// });

// Beer.find({ name: 'tecate' }, (err, listaDeCheves) => {
//  if (err) {
//    return console.log(err);
//  }
//  console.log(listaDeCheves);
// });

import axios from 'axios';
import dbConnect from './config';
import Beer from './models/beer';

dbConnect();

const onSuccess = function (response) {
  return response.data;
};

const onDataStracted = function (data) {
  return data.data;
};

const onError = function (error) {
  console.log(error);
};

const onBeers = function (beers) {
  const beerIt = (beer) => {
    const {
      id,
      name,
      nameDisplay,
      abv,
      isOrganic,
      isRetired,

      status,
      statusDisplay,
    } = beer;

    const modelBeer = new Beer({
      id,
      name,
      nameDisplay,
      abv,
      isOrganic,
      isRetired,

      status,
      statusDisplay,
    });
    modelBeer.save();
  };
  beers.forEach(beerIt);
};

const END_POINT = 'https://sandbox-api.brewerydb.com/v2/';
const BEERS = `${END_POINT}beers?key=ad155271938fb52891ebb37d52e07cbc&p=2`;
// const BEERS = END_POINT + 'beers';
const numberOfPages = 23;
let currentPage = 1;
const getNextBeers = () => {
  const url = `${BEERS}&P=${currentPage}`;
  console.log(url);
  axios
    .get(url)
    .then(onSuccess)
    .then(onDataStracted)
    .then(onBeers)
    .then(() => {
      currentPage += 1;
      if (currentPage <= numberOfPages) {
        getNextBeers();
      }
    })
    .catch(onError);
};
getNextBeers();

import Beer from '../models/beer';
import onPromiseError, { valUserType } from './utils';

const onGetList = (req, res) => {
  const onBeersFound = (beers) => {
    res.json({
      message: 'se ha realizado con exito',
      data: beers,
    });
  };

  Beer.find({})
    .then(onBeersFound)
    .catch(onPromiseError(res));
};

const onGetEntity = (req, res) => {
  const { id } = req.params;
  const onBeerFound = (beer) => {
    res.json({
      message: 'se ha realizado con exito',
      data: beer,
    });
  };

  Beer.findOne({ _id: id })
    .then(onBeerFound)
    .catch(onPromiseError(res));
};

const onCreateEntity = (req, res) => {
  if (!valUserType(req.user, 'admin')) {
    res.status(500).json({
      message: 'Usuario sin permiso',
    });
    return;
  }
  const beer = Beer(req.body);
  const onBeerCreated = (beerCreated) => {
    res.json({
      message: 'Exito',
      data: beerCreated,
    });
  };
  beer
    .save()
    .then(onBeerCreated)
    .catch(onPromiseError(res));
};

const onUpdateEntity = (req, res) => {
  if (!valUserType(req.user, 'admin')) {
    res.status(500).json({
      message: 'Usuario sin permiso',
    });
    return;
  }
  const { id } = req.params;
  const {
    name, nameDisplay, abv, isOrganic, isRetired, status, statusDisplay,
  } = req.body;
  const onFindEntity = (beer) => {
    beer.name = name;
    beer.nameDisplay = nameDisplay;
    beer.abv = abv;
    beer.isOrganic = isOrganic;
    beer.isRetired = isRetired;
    beer.status = status;
    beer.statusDisplay = statusDisplay;
    const onBeerSaved = (beerUpdated) => {
      res.json({
        message: 'exito se actualizo tu cheve',
        data: beerUpdated,
      });
    };
    beer
      .save()
      .then(onBeerSaved)
      .catch(onPromiseError(res));
  };
  Beer.findOne({ _id: id })
    .then(onFindEntity)
    .catch(onPromiseError(res));
};

const onDeleteEntity = (req, res) => {
  if (!valUserType(req.user, 'admin')) {
    res.status(500).json({
      message: 'Usuario sin permiso',
    });
    return;
  }
  const { id } = req.params;
  const onBeerDeleted = () => {
    res.json({
      message: 'Ha sido borrado con exito',
    });
  };
  Beer.deleteOne({ _id: id })
    .then(onBeerDeleted)
    .catch(onPromiseError(res));
};

export default (app) => {
  app.get('/beer', onGetList);
  app.post('/beer', onCreateEntity);
  app.get('/beer/:id', onGetEntity);
  app.put('/beer/:id', onUpdateEntity);
  app.delete('/beer/:id', onDeleteEntity);
};

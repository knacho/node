"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = _interopRequireDefault(require("../models/user"));

var _beer = _interopRequireDefault(require("../models/beer"));

var _config = require("../config");

var _utils = _interopRequireWildcard(require("./utils"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const onGetList = (req, res) => {
  if (!(0, _utils.valUserType)(req.user, 'admin')) {
    res.status(500).json({
      message: 'Usuario sin permiso'
    });
    return;
  }

  const onUsersFound = users => {
    res.json({
      message: 'se ha realizado con exito',
      data: users
    });
  };

  _user.default.find({}).populate('beersTaken').then(onUsersFound).catch((0, _utils.default)(res));
};

const onGetEntity = (req, res) => {
  const {
    id
  } = req.params;

  if (req.user.type === 'mortal' && req.user._id !== id) {
    res.status(500).json("Can't checkout other users dude!");
    return;
  }

  const onUserFound = user => {
    res.json({
      message: 'se ha realizado con exito',
      data: user
    });
  };

  _user.default.findOne({
    _id: id
  }).populate('beersTaken').then(onUserFound).catch((0, _utils.default)(res));
};

const onCreateEntity = (req, res) => {
  if (!(0, _utils.valUserType)(req.user, 'admin')) {
    res.status(500).json({
      message: 'Usuario sin permiso'
    });
    return;
  }

  const {
    name,
    email,
    password
  } = req.body;

  const onSaltHash = hash => {
    const newUser = new _user.default({
      name,
      email,
      password: hash,
      beersTaken: []
    });

    const onSaveUser = userSaved => {
      res.json({
        message: 'Usuario creado con exito',
        data: userSaved
      });
    };

    newUser.save().then(onSaveUser).catch((0, _utils.default)(res));
  };

  _bcrypt.default.hash(password, _config.SALTINESS).then(onSaltHash).catch((0, _utils.default)(res));
};

const onUpdateEntity = (req, res) => {
  const {
    id
  } = req.params;

  if (req.user.type === 'mortal' && req.user._id !== id) {
    res.status(500).json("Can't checkout other users dude!");
    return;
  }

  const {
    name,
    email,
    password
  } = req.body;

  const onUserFound = user => {
    user.name = name;
    user.email = email;
    user.password = password;

    const onUserSaved = userSaved => {
      res.json({
        message: 'Usuario Actualizado',
        data: userSaved
      });
    };

    user.save().then(onUserSaved).catch((0, _utils.default)(res));
  };

  _user.default.findOne({
    _id: id
  }).then(onUserFound).catch((0, _utils.default)(res));
};

const onDeleteEntity = (req, res) => {
  const {
    id
  } = req.params;

  if (req.user.type === 'mortal' && req.user._id !== id) {
    res.status(500).json("Can't checkout other users dude!");
    return;
  }

  const onUserDeleted = () => {
    res.json({
      message: 'Usuario borrado correctamente'
    });
  };

  _user.default.deleteOne({
    _id: id
  }).then(onUserDeleted).catch((0, _utils.default)(res));
};

const onDrankBeer = (req, res) => {
  if (!req.user) {
    res.status(400).json({
      message: 'Permiso denegado'
    });
    return;
  }

  const {
    beerID
  } = req.params;

  const onBeerFound = beerFound => {
    if (!beerFound) {
      res.status(404).json({
        message: 'cheve no enctrada'
      });
    }

    req.user.beersTaken.push(beerFound._id);

    const onUserSaved = () => {
      res.json({
        message: 'User drank a beer successfully'
      });
    };

    req.user.save().then(onUserSaved).catch((0, _utils.default)(res));
  };

  _beer.default.findOne({
    _id: beerID
  }).then(onBeerFound).catch((0, _utils.default)(res));
};

const onLogin = (req, res) => {
  const {
    email,
    password
  } = req.body;

  const onUserFound = user => {
    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    const onCompare = isEqual => {
      if (!isEqual) {
        res.status(300).json({
          message: 'wrong password'
        });
      }

      const token = _jsonwebtoken.default.sign({
        id: user._id
      }, _config.SECRET, {
        expiresIn: 240
      });

      res.json({
        auth: true,
        token
      });
    };

    _bcrypt.default.compare(password, user.password).then(onCompare).catch((0, _utils.default)(res));
  };

  _user.default.findOne({
    email
  }).then(onUserFound).catch((0, _utils.default)(res));
};

var _default = app => {
  app.get('/user', onGetList);
  app.get('/user/:id', onGetEntity);
  app.post('/user', onCreateEntity);
  app.post('/user/login', onLogin);
  app.put('/user/:id', onUpdateEntity);
  app.put('/user/drank/:beerID', onDrankBeer);
  app.delete('/user/:id', onDeleteEntity);
};

exports.default = _default;
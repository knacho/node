import jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import User from '../models/user';

export default (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const decode = jwt.verify(authorization, SECRET);
    const onUserFound = (user) => {
      if (user) {
        req.user = user;
      }
      next();
    };
    User.findOne({ _id: decode.id })
      .then(onUserFound)
      .catch(() => next());
  } catch (e) {
    next();
  }
};

export const registerPath = () => {};

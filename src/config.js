import mongoose from 'mongoose';

export default function dbConnect() {
  mongoose.connect(
    'mongodb+srv://rakirox:1234567890@prueba-99adx.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true },
  );
}

export const SECRET = 'asjkljksajkaskjlsalkaslksa';
export const SALTINESS = 8;

require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3050;
  process.env.MONGODB_URI = process.env.MONGODB_URI_DEV;
  process.env.JWT_SECRET = process.env.JWT_SECRET_DEV;
} else if (env === 'test') {
  process.env.PORT = 3050;
  process.env.MONGODB_URI = process.env.MONGODB_URI_TEST;
  process.env.JWT_SECRET = process.env.JWT_SECRET_TEST;
}
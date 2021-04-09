import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.NODE_ENV === 'production'
  ? process.env.MONGODB_URI_PROD
  : process.env.MONGODB_URI
const SECRET_PASSPHRASE = process.env.BOILERPLATE_PASSPHRASE

export default {
  secret: SECRET_PASSPHRASE,
  database: MONGODB_URI
}

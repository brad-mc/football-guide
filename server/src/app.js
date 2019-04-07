const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')
const OktaJwtVerifier = require('@okta/jwt-verifier')

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '0oafqfebblC4dsCV1356',
  issuer: 'https://dev-232676.okta.com/oauth2/default'
})

let app = express()
app.use(cors())
app.use(bodyParser.json())

app.use((req, res, next) => {
  // require every request to have an authorization header
  if (!req.headers.authorization) {
    return next(new Error('Authorization header is required'))
  }
  let parts = req.headers.authorization.trim().split(' ')
  let accessToken = parts.pop()
  oktaJwtVerifier.verifyAccessToken(accessToken)
    .then(jwt => {
      req.user = {
        uid: jwt.claims.uid,
        email: jwt.claims.sub
      }
      next()
    })
    .catch(next) // jwt did not verify!
})

// For ease of this tutorial, we are going to use SQLite to limit dependencies
const database = new Sequelize('pukka', 'postgres', 'IAs2vj3b#R9O!gL9', {
  host: '130.211.198.244',
  dialect: 'postgres'
})

// Define our Post model
// id, createdAt, and updatedAt are added by sequelize automatically
let Post = database.define('teams', {
  name: Sequelize.STRING,
  division: Sequelize.INTEGER,
  logo: Sequelize.BLOB
})

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
})

// Create the dynamic REST resource for our Post model
let userResource = epilogue.resource({
  model: Post,
  endpoints: ['/teams', '/teams/:id']
})

// Resets the database and launches the express app on :8081
database
  .sync({ force: true })
  .then(() => {
    app.listen(8081, () => {
      console.log('listening to port localhost:8081')
    })
  })

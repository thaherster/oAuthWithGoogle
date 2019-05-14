// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const { startDatabase } = require("../database/mongo");
const { insertAd, getAds, deleteAd, updateAd } = require("../database/ads");

// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const ads = [{ title: "Hello, world (again)!" }];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
// app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// defining an endpoint to return all ads

app.get("/", async (req, res) => {
  res.send(await getAds());
});

// ... app definition, middleware configuration, and

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-autho.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: "humblesimple.com",
  issuer: `https://dev-autho.auth0.com/`,
  algorithms: ["RS256"]
});
app.use(checkJwt);

app.post("/", async (req, res) => {
  const newAd = req.body;
  console.log(req.body);
  await insertAd(newAd);
  res.send({ message: "New ad inserted." });
});

// endpoint to delete an ad
app.delete("/:id", async (req, res) => {
  await deleteAd(req.params.id);
  res.send({ message: "Ad removed." });
});

// endpoint to update an ad
app.put("/:id", async (req, res) => {
  const updatedAd = req.body;
  await updateAd(req.params.id, updatedAd);
  res.send({ message: "Ad updated." });
});

// start the in-memory MongoDB instance
startDatabase().then(async () => {
  await insertAd({ title: "Hello, now from the in-memory database!" });

  // start the server
  app.listen(3001, async () => {
    console.log("listening on port 3001");
  });
});
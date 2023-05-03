const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'contacts API',
    description: 'database storing theoretical magic the gathering decks',
  },
  host: 'https://cse341-3x4y.onrender.com',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/cards.js', './routes/decks.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
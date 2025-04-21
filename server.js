const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { initDb } = require('./database');
const schoolRoutes = require('./routes/schools');


dotenv.config();
const port = process.env.PORT || 3000;

const app = express();


app.use(bodyParser.json());


app.use('/', schoolRoutes);



// Initialize database and start server
async function startServer() {
  const dbInitialized = await initDb();
  
  if (dbInitialized) {
    app.listen(port, () => {
      console.log(`School Proximity API running on port ${port}`);
    });
  } else {
    console.error('Failed to initialize database. Server not started.');
    process.exit(1);
  }
}


startServer();
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();


let sequelize;

// Prioritize connection URLs in this order: DATABASE_URL, MYSQL_PUBLIC_URL, MYSQL_URL
const connectionUrl = process.env.DATABASE_URL || process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL;

if (connectionUrl) {
  // Use the connection URL directly when available
  sequelize = new Sequelize(connectionUrl, {
    dialect: 'mysql',
    logging: console.log,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false // Needed for secure Railway connections
      }
    }
  });
  console.log('Using database connection URL');
} else {
  // Fall back 
  sequelize = new Sequelize(
    process.env.MYSQLDATABASE || process.env.DB_NAME,
    process.env.MYSQLUSER || process.env.DB_USER,
    process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
    {
      host: process.env.MYSQLHOST || process.env.DB_HOST,
      port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: console.log,
      
    }
  );
  console.log('Using individual database connection parameters');
}

// Initialize database with retry mechanism
const initDb = async () => {
  const maxRetries = 5;
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
      
      await sequelize.sync();
      console.log('Database synchronized successfully.');
      
      return true;
    } catch (error) {
      retries++;
      console.error(`Database connection attempt ${retries}/${maxRetries} failed:`, error);
      
      if (retries >= maxRetries) {
        console.error('Maximum retries reached. Unable to connect to the database.');
        return false;
      }
      
      // Wait before retrying 
      const delay = Math.min(1000 * Math.pow(2, retries), 10000);
      console.log(`Retrying in ${delay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

module.exports = {
  sequelize,
  initDb
};
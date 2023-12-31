const mySql = require("mysql2/promise");
require("dotenv").config();

// const connectDB = mySql.createConnection(process.env.DATABASE_URL);
// exports.databaseConnection  = connectDB;

async function query(sql, values) {
  try {
    const connection = await mySql.createConnection(process.env.DATABASE_URL);

    //result will have our query result and temp will be the schema
    const [results, ...temp] = await connection.query(sql, values);
    connection.end();

    return results;
  } catch (err) {
    console.error("Error getting connection:", err.message);
    throw err;
  }
}

module.exports = {
  query,
};

// Create a connection pool
// const pool = mySql.createPool(process.env.DATABASE_URL);

// module.exports = pool;

// pool.query('SELECT * FROM Products', (err, results) => {
//     if (err) {
//         console.error('Error executing query:', err);
//     } else {
//         console.log('Query results:', results);
//     }
// });

// connectDB.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected to MySql");
// const sql = "CREATE TABLE Orders (unlocKey VARCHAR(50) NOT NULL, price VARCHAR(10) NOT NULL, productID INT, userID INT, orderID INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (orderID), KEY productID_idx (productID), KEY userID_idx (userID))";

// connectDB.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table created");
//   console.log(result)
// });
// });

const mysql = require("mysql");

// we placed the connections in this source object
const source = {
  // localhost
  localhost: {
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "todolist"
  },

  // jawsDB
  jawsDB: {
    port: 3306,
    host: "<host name>",
    user: "<name of user>",
    password: "<password>",
    database: "<name of database>"
  }
};

const connection = mysql.createConnection(source.localhost);

connection.connect(function(err) {
  if (err) {
    console.error(`error connecting: ${err.stack1}`);
    return;
  }
  console.log(`connected as id: ${connection.threadId}`)
});

module.exports = connection;
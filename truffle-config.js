const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
    port: 9545,
    network_id: "*",
    host: "127.0.0.1"
    }
},
  compilers:{
    solc: {
      version: '^0.6.0'
    }
  }
};

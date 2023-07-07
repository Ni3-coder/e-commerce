const bcrypt = require("bcrypt");
const request = require("request");
const dotenv = require("dotenv");
dotenv.config();
const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;

const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error)
    }
};

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};


const btcaddress = async (email) => {
    const headers = {
      "content-type": "text/plain;"
    };
  
    const emailPrefix = email.substring(0, 4);
    const dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getnewaddress","params":["${emailPrefix}"]}`;
    const options = {
      url: `http://${USER}:${PASS}@127.0.0.1:18332/`,
      method: "POST",
      headers: headers,
      body: dataString
    };
  
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          reject(error);
        } else if (response.statusCode === 200) {
          const data = JSON.parse(body);
          resolve(data.result);
        } else {
          reject(new Error(`Request failed with status code ${response.statusCode}`));
        }
      });
    });
  };

module.exports = {
    hashPassword,
    comparePassword,
    btcaddress
};

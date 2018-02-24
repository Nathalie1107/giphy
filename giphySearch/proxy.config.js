const CONFIG = [
  {
    context: ['/**'],
    target: 'http://localhost:8080', //any outgoing request goes to localhost
    secure: false,
    logLevel: "debug"
  }
];

module.exports = CONFIG;

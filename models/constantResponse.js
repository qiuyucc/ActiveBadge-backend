var constants = require('./constants');
var moment = require('moment')

module.exports = {
    success: (res, response) => {
      const body = {
        ack: constants.API_SUCCESS,
        timestamp: moment().unix(),
        response: response
      };
      res.status(200).json(body);
      return;
    },
  
    failure: (res, response) => {
      const body = {
        ack: constants.API_FAILURE,
        timestamp: moment().unix(),
        response: response
      };
      res.status(400).json(body);
      return;
    }
  };
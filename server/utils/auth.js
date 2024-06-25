const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// set token secret and expiration date
const secret = "mysecretssssssssssh";
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
	extensions: {
	  code: 'UNAUTHENTICATED',
	},
  }),
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
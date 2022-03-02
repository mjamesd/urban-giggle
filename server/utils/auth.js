const jwt = require('jsonwebtoken');

const secret = 'm!t2#1Tsn#vLl6w3&!YWm^wMNXLTe5vFYhZcFJ1qCnMTveljbyH^*T&DOyIMBi0QwnTD$J2v9t#cHYVegUN5TfRT#8VMdZs@0uZ';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // We split the token string into an array and return actual token
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // return the request object so it can be passed to the resolver as `context`
    return req;
  },
  signToken: function ({ email, name, _id, isAdmin }, setExpiration) {
    const payload = { email, name, _id, isAdmin };
    // can supply optional `setExpiration`, i.e. set to Date.now()/1000 to make it immediately expire
    const thisExpiration = (setExpiration) ? setExpiration : expiration;
    return jwt.sign({ data: payload }, secret, { expiresIn: thisExpiration });
  },
};

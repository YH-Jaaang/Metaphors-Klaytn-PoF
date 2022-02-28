module.exports = {
  secret: "text-adventure-secret-key", //secret-key
  jwtExpiration: 72007200,         // 2 hours
  jwtRefreshExpiration: 1209600, // 14 days
  /* for test */
  // jwtExpiration: 60,          // 1 minute
  // jwtRefreshExpiration: 120,  // 2 minutes
};

var router = require('express').Router();
var SERVERS = require('./graphql');

console.log('arriba a /api');


router.use('/hobby', require('./hobbys'));
// router.use('/graphqlauth', require('../auth').required); // not nice
// SERVERS.graphqlauth.applyMiddleware({ app: router, path: '/graphqlauth' });
// SERVERS.graphql.applyMiddleware({ app: router, path: '/graphql' });
// SERVERS.graphql.applyMiddleware({ app: router, path:'/graphql' });

// router.use(function(err, req, res, next) {
//     if (err.name === 'ValidationError') {
//         return res.status(422).json({
//             errors: Object.keys(err.errors).reduce(function(errors, key) {
//                 errors[key] = err.errors[key].message;

//                 return errors;
//             }, {})
//         });
//     }

//     return next(err);
// });

module.exports = router;
// const services = require('./services')
//
// module.exports = (router, models) => {
//   router
//     .route('/download-links')
//     .get((req, res) => {
//       services
//         .findAll(req, models)
//         .then(r => res.json(r))
//         .catch(e => res.status(500).send({ error: e }))
//     })
//     .post((req, res) => {
//       services
//         .create(req, models)
//         .then(r => res.json({ message: 'Book created!', instance: r }))
//         .catch(e => res.status(500).send({ error: e }))
//     })
//
//   router.route('/books/:book_id').get((req, res) => {
//     services
//       .findById(req, models)
//       .then(r => res.json(r))
//       .catch(e => res.status(500).send({ error: e }))
//   })
// }

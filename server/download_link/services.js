// const defaultOptions = {
//   attributes: ['url', 'type'],
// }
//
// module.exports = {
//   create: (req, models, options) => {
//     const { book_id, url, type } = req.body
//     return models.DownloadLink.create(
//       {
//         book_id,
//         url,
//         type,
//       },
//       { ...options }
//     )
//   },
//
//   createMany: (req, models, options) => {
//     const values = req.body || req
//     if (!Array.isArray(values)) return Promise.reject()
//     return Promise.all([
//       ...values.map(entry => {
//         const { book_id, url, type } = entry
//         return models.DownloadLink.create(
//           {
//             book_id,
//             url,
//             type,
//           },
//           { ...options }
//         )
//       }),
//     ])
//   },
// }

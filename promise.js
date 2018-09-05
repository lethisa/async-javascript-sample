// Sample Promise #1
// promise always async
// callback can sync or async
/// /////////////////////////////////////////

// function doAsyncTask () {
//   let error = false
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (error) {
//         tolak(reject) // pass values
//       } else {
//         resolve('done') // pass values
//       }
//     }, 1000)
//   })

//   function tolak (reject) {
//     reject('error')
//   }
// }

// doAsyncTask().then(val => console.log(val), err => console.error(err))

// Sample Promise #2
/// /////////////////////////////////////////
// const fs = require('fs')
// const util = require('util')
// const readFile = util.promisify(fs.readFile) // -> alternative than below code

// // function readFile (filename, encoding) {
// //   return new Promise((resolve, reject) => {
// //     fs.readFile(filename, encoding, (err, data) => {
// //       if (err) reject(err)
// //       resolve(data)
// //       // OR
// //       // if (err) return reject(err)
// //     })
// //   })
// // }

// readFile('./files/demofile.txt', 'utf-8').then(
//   data => console.log('File Read', data),
//   err => console.log('Failed to Read File', err)
// )

// Sample Promise #3
// Unlike callback, promise are always async
/// /////////////////////////////////////////

// function doAsyncTask () {
//   return Promise.resolve()
// }

// doAsyncTask().then(_ => console.log(message))

// let message = 'Promise Resolved'

// Sample Promise #4
// chaining -> connect series of 'then' handlers together in a chain
/// /////////////////////////////////////////

// const prom = Promise.resolve('done')
// prom.then(val => {
//   console.log(val)
//   return 'done2'
// }).then(val => console.log(val)
// )

// Sample Promise #5
// Another chaining
/// /////////////////////////////////////////

// const prom = Promise.resolve('done')

// prom.then(val => {
//   console.log(val)
//   return 'done2'
// })

// prom.then(val => console.log(val))

// Sample Promise #6
// Another chaining
/// /////////////////////////////////////////

// const fs = require('fs')
// const zlib = require('zlib')

// function gzip (data) {
//   return new Promise((resolve, reject) => {
//     zlib.gzip(data, (err, result) => {
//       if (err) reject(err)
//       resolve(result)
//     })
//   })
// }

// function readFile (filename, encoding) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filename, encoding, (err, data) => {
//       if (err) reject(err)
//       resolve(data)
//     })
//   })
// }

// readFile('./files/demofile.txt', 'utf-8').then(
//   data => {
//     gzip(data).then(
//       res => console.log(res),
//       err => console.error('Failed: ', err)
//     )
//   },
//   err => console.error('Failed To Read', err)
// )

// Sample Promise #7
/// /////////////////////////////////////////

// Promise.resolve('done')
//   .then(val => {
//     console.log(val)

//     return new Promise(resolve => {
//       setTimeout(() => resolve('done2'), 1000)
//     })
//     // the next then waits for this promise to resolve before continueing
//   })
//   .then(val => console.log(val))

// Sample Promise #8
// Resolve callback hell from gzip code above
/// /////////////////////////////////////////

// const fs = require('fs')
// const zlib = require('zlib')

// function gzip (data) {
//   return new Promise((resolve, reject) => {
//     zlib.gzip(data, (err, result) => {
//       if (err) reject(err)
//       resolve(result)
//     })
//   })
// }

// function readFile (filename, encoding) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filename, encoding, (err, data) => {
//       if (err) reject(err)
//       resolve(data)
//     })
//   })
// }

// readFile('./files/demofile.txt', 'utf-8')
//   .then(
//     data => {
//       return gzip(data)
//     },
//     err => console.error('Failed To Read', err)
//   )
//   .then(
//     data => {
//       console.log(data)
//     },
//     err => console.log('Failed: ', err)
//   )

// Sample Promise #9
// Error Handling
/// /////////////////////////////////////////

// basic
// Promise.reject('fail')
//   .then(val => console.log(val))
//   .then(val => console.log(val), err => console.error(err))

// add throw

// new Promise((resolve, reject) => {
//   throw 'fail'
// })
//   .then(val => {
//     console.log(val)
//   })
//   .then(val => console.log(val), err => console.error(err))

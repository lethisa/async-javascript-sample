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

// add catch

// Promise.reject('done')
//   // .then(val => {
//   //   throw 'fail'
//   // })
//   .then(val => console.log(val))
//   .catch(err => console.error(err))

// Sample Promise #10
// Error Handling gzip code above
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
//     }
//   )
//   .then(
//     data => {
//       console.log(data)
//     }
//   ).catch(err => console.error('Failed To Gzip: ', err))

// Sample Promise #11
// Promise - finally
/// /////////////////////////////////////////

// Promise.resolve('done')
//   .then(val => {
//     throw new Error('fail')
//   })
//   .then(val => console.log(val))
//   .catch(err => console.error(err))
//   .finally(_ => console.log('cleaning up'))

// Sample Promise #12
// Promise - All
/// /////////////////////////////////////////

// const util = require('util')
// const fs = require('fs')
// const readFile = util.promisify(fs.readFile)

// const files = ['./files/demofile.txt', 'files/demofile.other.txt']

// let promises = files.map(name => readFile(name, 'utf-8'))
// Promise.all(promises).then(values => {
//   console.log(values)
// }).catch(err => console.error('Error: ', err))

// Sample Promise #13
// Promise - Race
/// /////////////////////////////////////////

// let car1 = new Promise(resolve => setTimeout(resolve, 2000, 'car 1'))
// let car2 = new Promise(resolve => setTimeout(resolve, 1000, 'car 2'))
// let car3 = new Promise(resolve => setTimeout(resolve, 3000, 'car 3'))

// Promise.race([car1, car2, car3]).then(value => {
//   console.log('promise resolved', value)
// })

// another version
// let car1 = new Promise((resolve, reject) => {
//   setTimeout(reject, 1000, 'car 1 crashed')
// })
// let car2 = new Promise(resolve => setTimeout(resolve, 2000, 'car 2'))
// let car3 = new Promise(resolve => setTimeout(resolve, 3000, 'car 3'))

// Promise.race([car1, car2, car3]).then(values => {
//   console.log('promise resolved', values)
// }).catch(error => {
//   console.log('promise rejected', error)
// })

// Sample Promise #14
// Promise - Race Implemtation
/// /////////////////////////////////////////

// function readFileFake (sleep) {
//   return new Promise(resolve => setTimeout(resolve, sleep, 'read'))
// }

// function timeout (sleep) {
//   return new Promise((resolve, reject) => {
//     setTimeout(reject, sleep, 'timeout')
//   })
// }

// Promise.race([readFileFake(5000), timeout(1000)]).then(data => {
//   console.log(data)
// }).catch(err => {
//   console.error(err)
// })

// readFileFake(5000)

// Sample Promise #15
/// /////////////////////////////////////////

function authenticate () {
  console.log('autheticating')
  return new Promise(resolve => setTimeout(resolve, 2000, { status: 200 }))
}

function publish () {
  console.log('publishing')
  return new Promise(resolve => setTimeout(resolve, 2000, { status: 403 }))
}

function timeout (sleep) {
  return new Promise((resolve, reject) => setTimeout(reject, sleep, 'timeout'))
}

function safePublish () {
  return publish().then(res => {
    if (res.status === 403) {
      return authenticate()
    }
    return res
  })
}

Promise.race([safePublish(), timeout(3000)])
  // .then(res => {
  //   if (res.status === 403) {
  //     return authenticate()
  //   }
  // })
  .then(_ => console.log('pubished'))
  .catch(err => {
    if (err === 'timeout') {
      console.error('request timed out')
    } else {
      console.log(err)
    }
  })

// sample code #1
/// /////////////////////////////////////

// const doAsyncTask = () => Promise.resolve('done')

// doAsyncTask().then(val => console.log(val))
// console.log('here') // first printed

// when using async/ await
// const doAsyncTask = () => Promise.resolve('done')
// async function asim () {
//   // mark it as async
//   let value = await doAsyncTask() // don't need to call then
//   console.log(value)
// }

// asim()

// with IIFE
// const doAsyncTask = () => Promise.resolve('done');

// (async function () {
//   // IIFE, note the async
//   let value = await doAsyncTask()
//   console.log(value)
// })()

// with blok - async await
// const doAsyncTask = () => Promise.resolve('1');
// (async function () {
//   let value = await doAsyncTask()
//   console.log(value)
//   console.log('2')
// })()

// without await
// const doAsyncTask = () => Promise.resolve('1');
// (async function () {
//   doAsyncTask().then(console.log)
//   console.log('2')
// })()

// sample code #2
// async function return a promise
/// /////////////////////////////////////

// const doAsyncTask = () => Promise.resolve('1')

// let asyncFunction = async function () {
//   let value = await doAsyncTask()
//   console.log(value)
//   console.log('2')
//   return '3' // whatever we return is like a resolve
// }

// asyncFunction().then(v => console.log(v))

// sample code #3
// because it's now sync we can use try/ catch, the catch return the reject
/// /////////////////////////////////////

// const doAsyncTask = () => Promise.reject('error');

// const asyncFunction = async function () {
//   try {
//     const value = await doAsyncTask()
//   } catch (e) {
//     console.error('Moo: ', e)
//     return;
//   }
// }

// asyncFunction()

// Question #1
// convert promise to await
/// ///////////////////////////////////////////////////////////

// const util = require('util')
// const fs = require('fs')
// const readFile = util.promisify(fs.readFile)

// const files = ['./files/demofile.txt', './files/demofile.other.txt'];

// await version
// (async () => {
//   for (let file of files) {
//     let value = await readFile(file, 'utf-8')
//     console.log(value)
//   }
// })()

// promise version
// let promises = files.map(name => readFile(name, { encoding: 'utf-8' }))
// Promise.all(promises).then(values => {
//   console.log(values)
// })

// combie await + promise
// (async () => {
//   let promises = files.map(name => readFile(name, 'utf-8'))
//   let values = await Promise.all(promises)
//   console.log(values)
// })()

// Question #2
// Async Iterator
/// ///////////////////////////////////////////////////////////

// (async () => {
//   const util = require('util')
//   const fs = require('fs')
//   const readFile = util.promisify(fs.readFile)

//   const files = ['./files/demofile.txt', './files/demofile.other.txt']
//   const promises = files.map(name => readFile(name, 'utf-8'))
//   for await (let file of promises) {
//     console.log(file)
//   }
// })()

// another sample

// const customIterator = () => ({
//   [Symbol.iterator]: () => ({
//     x: 0,
//     next () {
//       if (this.x > 100) {
//         return {
//           done: true,
//           value: this.x
//         }
//       }
//       return {
//         done: false,
//         value: this.x++
//       }
//     }
//   })
// })

// for (let x of customIterator()) {
//   console.log(x)
// }

// another sample with await

const customIterator = () => ({
  [Symbol.asyncIterator]: () => ({
    x: 0,
    next () {
      let y = this.x++

      if (this.x > 100) {
        return Promise.resolve({
          done: true,
          value: this.x
        })
      }

      return Promise.resolve({
        done: false,
        value: y
      })
    }
  })
});

(async () => {
  for await (let x of customIterator()) {
    console.log(x)
  }
})()

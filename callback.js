// Question - How Callback Work
// ========================================

// function doAsyncTask(cb) {
//     cb();
// }
// doAsyncTask(_ => console.log(message));
//
// let message = "Callback Called";

// Answer 1 - SetImmediate
// Callbacks are not async by default
// ========================================

// function doAsyncTask(cb){
//     setImmediate(()=>{
//         console.log("Async Task Calling Callback");
//     cb();
// });
// }

// doAsyncTask(()=> console.log(message));
// let message = "Callback Called";

// Answer 2 - process.nextTick
// ========================================

// function doAsyncTask(cb) {
//     process.nextTick(()=>{
//       console.log("Async Task Calling Callback");
//       cb();
//     });
// }
//
// doAsyncTask(()=> console.log(message));
// let message = "Callback Called";

// Question
// The below code swallows the error and doesn't pass it up the chain,
// make it pass the error up the stack using the next callback
// ========================================

// const fs = require("fs");
//
// function readFileThenDo(next){
//     fs.readFile("./blah.nofile", (err, data)=>{
//         next(data)
//     });
// }

// Answer
// ========================================

// const fs = require("fs");

// function readFileThenDo(next){
//     fs.readFile("./blah.nofile", (err, data)=>{
//         if(err){
//             next(err);
//         }else{
//             next(null, data);
//         }
//     });
// }

// readFileThenDo((err, data)=>{
//     if(err){
//         console.error(err);
//     }else{
//         console.log(data);
//     }
// });

// Question
// Instead of passing it up the stack throw it instead and try to catch it later on
// ========================================

// const fs = require("fs");

// function readFileThenDo(next){
//     fs.readFile("./blah.nofile", (err, data)=>{
//         if (err)  throw err;
//         next(data);
//     });
// }

// readFileThenDo(data => {
//     console.log(data);
//   });

//

// Answer
// Or if the error is serious, you can throw the error as soon as you see it.
// try..catch desn't work as you expect with callbacks,
// it only really works with synchronous code.

// By the time the callback throws the error we have moved on from the try..catch,
// the throw happens in the root scope and will just cause the program to exit.
// ========================================

// const fs = require("fs");

// function readFileThenDo(next) {
//   fs.readFile("./blah.nofile", (err, data) => {
//     if (err) throw err;
//     next(null, data);
//   });
// }

// try {
//   readFileThenDo((_, data) => console.log(data));
// } catch (err) {
//   console.error(err);
// }

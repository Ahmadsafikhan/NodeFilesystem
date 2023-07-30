// ..................................hoisting............................

// function fun1() {
//   console.log(a);
// }
// try {
//   fun1();
// } catch (error) {
//   console.log(error.message);
// }
// let a = 10;

// ...............................closure..................................

function outerFunc(params) {
  // do something here
  let counter = 0;

  function innerFunc(params) {
    counter += 1;
    return counter;
  }

  innerFunc();

  return innerFunc;
}

const a = outerFunc();
const b = a();
console.log(b);




function doIt() {

  const t = 2;

  // is the code going to block and wait for the callback function passed
  // to the setTimeout to execute before returning from doIt?

  setTimeout(() => {
    console.log(t); // write the value of t to the console
  }, 2000 /* 2 seconds */);



}

doIt();
console.log('done with do it');
doIt();

const add = (x,y) => x + y;

add(1,2); // 3
add(2,3); // 5
add(1,2);
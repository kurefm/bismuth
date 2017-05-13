function A() {
  return Promise.resolve('A');
}

function B() {
  return Promise.reject('B');
}

function good(id) {
  console.log(`${id} good`);
}

function bad(id) {
  console.log(`${id} bad`);
}

B().then(good).catch(bad).then(A).then(good)
.catch(bad);

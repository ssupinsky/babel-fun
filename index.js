const babel = require('@babel/core');
const myPlugin = require('./plugin');


// process.stdin.resume();

const code = `
  import t from 't';
  const a = window?.a;
`;
const code2 = `
  const a = window?.a;
`;




console.log(
  babel.transformSync(code2, {
    // ast: true,
    plugins: [myPlugin],
  }).code
);

console.log('\n----------------\n');

console.log(
  babel.transformSync(code, {
    // ast: true,
    plugins: [myPlugin],
  }).code
);

console.log('\n----------------\n');

console.log(
  babel.transformSync(code, {
    // ast: true,
    plugins: [myPlugin],
  }).code
);

console.log('\n----------------\n');

console.log(
  babel.transformSync(code2, {
    // ast: true,
    plugins: [myPlugin],
  }).code
);

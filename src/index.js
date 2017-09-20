// import _ from 'lodash';
require('./index.css');
require('./index.scss');

const textA = _.join(['webpack', 'environment', 'demo'], '');
console.log(textA);

const textB = 'b';
console.log(textB);

let a = 'a';
let b = 8 ** 2;

async function fn1() {
    console.log(a);
}

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}
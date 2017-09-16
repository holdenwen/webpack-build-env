// import _ from 'lodash';

const textA = _.join(['webpack', 'environment', 'demo'], '');
console.log(textA);

const textB = 'b';
console.log(textB);

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}
#! /usr/bin/env node
const {program} = require('commander');

// console.log('hello world')


// if(process.argv[2] === '--help'){
//   console.log('hello world');
// }

program.option('-f --framework <framework>','设置框架')
program.parse(process.argv)

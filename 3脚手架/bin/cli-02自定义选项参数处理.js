#! /usr/bin/env node
const {program} = require('commander');

program.option('-f --framework <framework>','设置框架')


program
.command('create <project> [other...]')
.alias('crt')
.description('创建项目')
.action((project,args)=>{
    // 命令行的执行逻辑代码
    console.log(project,args)
})



program.parse(process.argv)

var inquirer = require("inquirer");
var config = require("../../config");
var downloadFun = require("./download");
const myAction = async (project, args) => {
  // 命令行的执行逻辑代码
  //   console.log(project, args);
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      choices: config.framework,
      message: "请选择你所使用的框架",
    },
  ]);
  // 下载代码模版
  downloadFun(config.frameworkUrl[answer.framework],project);
};
module.exports = myAction;

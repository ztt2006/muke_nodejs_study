const download = require("download-git-repo");
const ora = require('ora')
const chalk = require('chalk')

const downloadFun = function (url, project) {
    const spinner = ora().start()
    spinner.text = '正在下载......'
  download(
    "direct:" + url,
    project,
    { clone: true },
    (err) => {
      if(!err){
        spinner.succeed('下载成功')
        console.log(chalk.blue.bold('Done!'),chalk.bold( 'you run:'));
        console.log('cd ' + project);
        console.log('npm install');
        console.log('npm run dev');
      }else{
        spinner.fail('下载失败')
      }
    }
  );
};

module.exports = downloadFun;
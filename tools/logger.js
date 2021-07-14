const chalk = require('chalk');

class log {
  static error(message) {
    console.log(`${chalk.red('error')} - ${message}`);
  }
  static info(message) {
    console.log(`${chalk.blue('info')} - ${message}`);
  }
  static warn(message) {
    console.log(`${chalk.yellow('warning')} - ${message}`);
  }
  static success(message) {
    console.log(`${chalk.green('success')} - ${message}`);
  }
}
module.exports = log;

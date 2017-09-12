const seneca = require('seneca')();
const vorpal = require('vorpal')();
const chalk = require('chalk');

const state = {
  seneca
};

vorpal
  .history('tts')
  .use(require('./client'), state)
  .use(require('./act'), state)
  .delimiter(chalk.red('TTS >'))
  .show();

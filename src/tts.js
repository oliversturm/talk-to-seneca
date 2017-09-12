const vorpal = require('vorpal')();
const chalk = require('chalk');

const state = require('./state')();

vorpal
  .history('tts')
  .use(require('./client'), state)
  .use(require('./act'), state)
  .delimiter(chalk.red('TTS >'))
  .show();

const Seneca = require('seneca');
const chalk = require('chalk');

module.exports = function() {
  let seneca;
  let clientConfigs = [];

  function getSeneca() {
    if (!seneca)
      seneca = Seneca({
        log: 'quiet'
      });
    return seneca;
  }

  function resetSeneca() {
    getSeneca().close();
    seneca = undefined;
    clientConfigs = [];
  }

  function addClient(config, cont) {
    if (config) {
      console.log('config: ', config);

      getSeneca().client(config).ready(() => {
        cont(clientConfigs.push(config) - 1);
      });
    } else cont();
  }

  function showClient(index, log) {
    if (index >= 0 && index <= clientConfigs.length - 1)
      log(
        chalk.green('Client id ') + chalk.red(index) + chalk.green(': '),
        clientConfigs[index]
      );
  }

  function showClients(log) {
    clientConfigs.forEach((c, i) => showClient(i, log));
  }

  function clientCount() {
    return clientConfigs.length;
  }

  function prompt() {
    const cc = clientCount();
    const color = cc ? chalk.green : chalk.red;
    return color(
      `TTS [${cc ? cc + ' client' + (cc > 1 ? 's' : '') : 'disconnected'}] >`
    );
  }

  return {
    seneca: getSeneca,
    addClient,
    resetSeneca,
    showClient,
    showClients,
    clientCount,
    prompt
  };
};

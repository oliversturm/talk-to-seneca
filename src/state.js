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

  function addClient(config) {
    getSeneca().client(config);
    clientConfigs.push(config);
  }

  function showClient(index, log) {
    if (index >= 0 && index <= clientConfigs.length - 1)
      log(
        chalk.green('Client ') + chalk.red(index) + chalk.green(': '),
        clientConfigs[index]
      );
  }

  function showClients(log) {
    clientConfigs.forEach((c, i) => showClient(i, log));
  }

  return {
    seneca: getSeneca,
    addClient,
    resetSeneca,
    showClient,
    showClients
  };
};

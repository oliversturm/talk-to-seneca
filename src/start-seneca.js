const Seneca = require('seneca');

module.exports = () =>
  Seneca({
    log: 'silent'
  }).use('seneca-amqp-transport');

const chalk = require('chalk');

module.exports = (vorpal, state) => {
  function getConfig(args) {
    switch (args.type) {
      case 'tcp':
        return {
          type: 'tcp',
          host: args.options.host || 'localhost',
          port: args.options.port || 8080,
          pin: args.options.pin
        };
      case 'amqp':
        return {
          type: 'amqp',
          host: args.options.host || 'localhost',
          port: args.options.port || 5672,
          pin: args.options.pin,
          socketOptions: {
            noDelay: true
          }
        };
      default:
        return undefined;
    }
  }

  vorpal
    .command(
      'client <type>',
      "Configures a client connection to a running Seneca instance. Type can be 'tcp' or 'amqp' at this time."
    )
    .autocomplete(['tcp', 'amqp'])
    .option(
      '-h, --host <host>',
      "'host' or 'hostname' parameter. Default 'localhost'."
    )
    .option(
      '-p, --port <port>',
      "'port' parameter. Default: tcp - 8080, amqp - 5672."
    )
    .option(
      '--pin <pin>',
      'PIN for Seneca messages. Must be parseable by jsonic. Required for amqp clients.'
    )
    .validate(args => {
      if (args.type === 'amqp' && !args.options.pin)
        return 'For an amqp client, please specify --pin.';
      else return true;
    })
    .action(function(args, cb) {
      const that = this;

      state.addClient(getConfig(args), function(newId) {
        if (newId >= 0) that.log(chalk.green(`Client id ${newId} configured.`));
        else if (newId.err)
          that.log(chalk.red('ERROR: ', JSON.stringify(newId.err)));
        else that.log(chalk.red('Client configuration failed.'));
        vorpal.delimiter(state.prompt());
        cb();
      });
    });

  vorpal
    .command('reset', 'Resets the local Seneca instance.')
    .action(function(args, cb) {
      state.resetSeneca();
      this.log(chalk.green('Local Seneca instance reset.'));
      vorpal.delimiter(state.prompt());
      cb();
    });

  vorpal
    .command('show clients', 'Outputs all active client configs.')
    .action(function(args, cb) {
      state.showClients(this.log.bind(this));
      cb();
    });

  vorpal
    .command('show client <id>', 'Outputs client config with id.')
    .action(function(args, cb) {
      state.showClient(args.id, this.log.bind(this));
      cb();
    });
};

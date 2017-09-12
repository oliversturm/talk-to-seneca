module.exports = (vorpal, state) => {
  vorpal
    .command(
      'client <type>',
      'Configures a client connection to a running Seneca instance.'
    )
    .autocomplete(['tcp'])
    .option(
      '-h, --host <host>',
      "Server for TCP connections. Default 'localhost'."
    )
    .option('-p, --port <port>', 'Port for TCP connections. Default 8080.')
    .option(
      '--pin <pin>',
      'PIN for Seneca messages. Must be parseable by jsonic.'
    )
    .action(function(args, cb) {
      state.addClient({
        type: args.type,
        host: args.options.host || 'localhost',
        port: args.options.port || 8080,
        pin: args.options.pin
      });
      vorpal.delimiter(state.prompt());
      cb();
    });

  vorpal
    .command('reset', 'Resets the local Seneca instance.')
    .action(function(args, cb) {
      state.resetSeneca();
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

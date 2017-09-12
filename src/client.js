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
      //this.log('Received args: ', JSON.stringify(args));

      state.seneca.client({
        type: args.type,
        host: args.options.host || 'localhost',
        port: args.options.port || 8080,
        pin: args.options.pin || 'role:validation'
      });

      cb();
    });
};

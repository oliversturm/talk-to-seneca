const chalk = require('chalk');

module.exports = (vorpal, state) => {
  vorpal
    .command(
      'act <message...>',
      'Send a message. The message must be parseable by jsonic.'
    )
    .option(
      '-a, --async',
      'Send the message without a callback, i.e. asynchronously.'
    )
    .action(function(args, cb) {
      const that = this;

      const message = Array.isArray(args.message)
        ? args.message.join(' ')
        : args.message;

      function handleResult(err, result) {
        // empty line - without this, a long command sometimes
        // overlaps into the output (vorpal bug?)
        that.log('');

        if (err) that.log(chalk.red('ERROR: '), JSON.stringify(err, null, 2));
        if (result)
          that.log(chalk.green('Result: '), JSON.stringify(result, null, 2));

        cb();
      }
      if (args.options.async) {
        state.seneca().act(message);
        cb();
      } else state.seneca().act(message, handleResult);
    })
    .cancel(function() {
      this.log("Cancelled. Sorry this didn't work out.");
    });
};

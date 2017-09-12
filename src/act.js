const chalk = require('chalk');

module.exports = (vorpal, state) => {
  vorpal
    .command(
      'act <message...>',
      'Send a message. The message must be parseable by jsonic.'
    )
    .action(function(args, cb) {
      const that = this;

      const message = Array.isArray(args.message)
        ? args.message.join(' ')
        : args.message;

      state.seneca().act(message, function(err, result) {
        // empty line - without this, a long command sometimes
        // overlaps into the output (vorpal bug?)
        that.log('');

        if (err) that.log(chalk.red('ERROR: '), JSON.stringify(err, null, 2));
        if (result)
          that.log(chalk.green('Result: '), JSON.stringify(result, null, 2));

        cb();
      });
    });
};

# talk-to-seneca (tts)

A simple tool for developers to test Seneca based applications by sending messages to them interactively.

## Installation

```shell
npm install -g talk-to-seneca
```

## Usage

Run `tts`:

```shell
tts
TTS [disconnected] >
```

Get command help:

```shell
TTS [disconnected] > help

  Commands:

    help [command...]        Provides help for a given command.
...
```

Configure a client:

```shell
TTS [disconnected] > client tcp -p 3003
Client id 0 configured.
TTS [1 client] > show client 0
Client id 0:  { type: 'tcp', host: 'localhost', port: 3003, pin: undefined }
TTS [1 client] >
```

Configure an AMQP client:

```shell
TTS [disconnected] > client amqp --pin role:*
Client id 0 configured.
TTS [1 client] > show client 0
Client id 0:  { type: 'amqp',
  host: 'localhost',
  port: 5672,
  pin: 'role:*',
  socketOptions: { noDelay: true } }
TTS [1 client] > 
```

Send a message (act):

```shell
TTS [1 client] > act role:validation, domain: entity, cmd: validateOne, instance: { int1: 42, int2: 100, string: something , date1: '2017-09-12T12:57:47.825Z', date2: '2017-09-12T12:57:47.825Z' }
Result:  {
  "valid": true
}
TTS [1 client] > 
```

The string following the `act` command is passed to Seneca's `act` function, which interprets it using [jsonic](https://github.com/rjrodger/jsonic).

Error and result information that are received as a response to the message are output directly (*Result* in the sample).

## Status

The tool has just been created. There are some outstanding issues and lots of ideas for improvement. Please feel free to suggest anything or submit pull requests.


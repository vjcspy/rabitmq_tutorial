var amqp = require('amqplib/callback_api');

amqp.connect({
               protocol : 'amqp',
               hostname : 'localhost',
               port     : 5672,
               username : 'rabbitmq',
               password : 'rabbitmq',
               locale   : 'en_US',
               frameMax : 0,
               heartbeat: 0,
               vhost    : '/',
             }, function (err, conn) {
  conn.createChannel(function (err, ch) {
    var q = 'hello';
    
    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function (msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});
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
  
  if (err) {
    console.log(err);
    
  }
  else {
    conn.createChannel(function (err, ch) {
      var q   = 'hello';
      var msg = 'Hello World!';
      
      ch.assertQueue(q, {durable: false});
      ch.sendToQueue(q, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });
    
    setTimeout(function () {
      conn.close();
      process.exit(0)
    }, 500);
  }
});
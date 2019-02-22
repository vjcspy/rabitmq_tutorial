var amqp = require('amqplib/callback_api');

function chDo(ch) {
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
      conn.createChannel(function (_err, _ch) {
        if (_err) {
          console.log(_err)
        }
        else {
          ch(_ch);
        }
      });
    }
  });
}

module.exports = {
  chDo
};
var amqp = require("./amqp");

amqp.chDo((ch) => {
  var q = 'task_queue';
  
  ch.assertQueue(q, )
  ch.prefetch(1);
  ch.consume(q, function (msg) {
               var secs = msg.content.toString().split('.').length - 1;
    
               console.log(" [x] Received %s", msg.content.toString());
               setTimeout(function () {
                 console.log(" [x] Done");
                 // we need notify that task has been done. Message acknowledgment
                 ch.ack(msg);
               }, secs * 1000);
             },
             // config Message acknowledgment
             {noAck: false}
  );
});
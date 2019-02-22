var amqp = require("./amqp");

let taskNumber = 0;
var generateTask = () => {
  
  let task = "";
  for (let i = 0; i < Math.random() * 10; i++) {
    task += ".";
  }
  
  task += " task number " + taskNumber++;
  return task;
};

amqp.chDo((ch) => {
  const q = 'task_queue';
  setInterval(() => {
    const msg = generateTask();
    
    // to make sure or assert the queue existence
    ch.assertQueue(
      q,
      // durable setup for rabit saved queue in to disk
      {durable: true}
    );
    
    ch.sendToQueue(q, new Buffer(msg),
                   // Make sure messages will no be lost when rabit restart
                   {persistent: true}
    );
    console.log(" [x] Sent '%s'", msg);
  }, 500);
});
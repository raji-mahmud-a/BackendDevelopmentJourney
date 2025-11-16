class Notify{
 constructor(message){
 this.message = message
 }

 send(){
  throw new Error("implement a send method on this extension")
 }
}

class EmailNotification extends Notify{
 constructor(message){ super(message) }

 send(){
  return "Sending Email Notification: ", this.message
 }
}

class PushNotification extends Notify{
 constructor(message){super(message)}

 send(){
  return "Sending Push Notification: ", this.message
 }
}

class SMSNotification extends Notify{
 constructor(message){super(message)}

 send(){
  return "Sending SMS notification: ", this.message
 }
}

export default class Notification{
 static createNotification(type, message){
  switch(type){
   case 'email': return new EmailNotification(message)
   case 'push': return new PushNotification(message)
   case 'sms': return new SMSNotification(message)
   default: throw new Error("No notification method selected, please do so")
  }
 }
}


const email = Notification.createNotification('email', 'Hello via email');
const sms = Notification.createNotification('sms', 'Hello via SMS');
const push = Notification.createNotification("push", "Mahmud is sending a message")

console.log(email.send());
console.log(sms.send());
console.log(push.send())

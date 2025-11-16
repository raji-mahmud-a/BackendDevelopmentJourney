import {EventEmitter} from 'node:events';

class User extends EventEmitter{
  #room
  constructor(name){
    super()
    this.name=name
    this.#room
  }
  
  setRoom(room){
    room.joinRoom(this)
    this.#room=room
  }
  
  leaveRoom(room){
    room.leaveRoom(this)
    this.#room=undefined
  }
  
  message(message){
    if (!this.#room) {
      this.emit('error', "You're not a member of any room!!!  join a room to send a message!!")
    }
    this.emit('sent', `[you]:: ${message}`)
    this.#room.notify("message",message,this)
  }
  
  createRoom(name, code){
    const createdRoom = new Room(name, code)
    this.emit('newRoom', `${this.name} created a new room: ${name} with code:: ${code}`)
    this.setRoom(createdRoom)
    return createdRoom
  }
}

class Room{
  #members
  constructor(name, code){
    this.name=name
    this.code=code
    this.#members=[]
  }
  
  joinRoom(member){
    this.#members.push(member)
    this.notify("join", `[${member.name}] joined [${this.name}]`, member)
  }
  
  leaveRoom(member){
    this.#members = this.#members.filter((val)=>val !== member)
    this.notify("leave", `[${member.name}] left [${this.name}]`, member)
  }
  
  notify(reason='message', message, user){
    const allMembers = this.#members.filter((val)=>val!==user)
    switch (reason) {
      case 'message':
        allMembers.forEach((val)=>{
          val.emit('message', `[${user.name}]:: ${message}`)
        })
        break;
      case 'join':
        allMembers.forEach((val)=>{
          val.emit('join', `[${user.name}] joined the room`)
        })
        break;
      case 'leave':
        allMembers.forEach((val)=>{
          val.emit('leave', `[${user.name}] left the room`)
        })
        break;
      default:
        throw new Error("notify reason not allowed!!!")
        break;
    }
  }
}

const createUser = (name) => {
  const newly = new User(name)
  
  const registerEvent = (event, message) => {
    newly.on(event, (message) => {
      console.log(message)
    })
  }
  
  registerEvent("sent")
  registerEvent("message")
  registerEvent("join")
  registerEvent("leave")
  registerEvent("error")
  registerEvent("newRoom")
  
  return newly
}

const user1 = createUser("user1")
const user2 = createUser("user2")
const user3 = createUser("user3")
const user4 = createUser("user4")
const user5 = createUser("user5")
const user6 = createUser("user6")
const user7 = createUser("user7")
const user8 = createUser("user8")

const room1 = user1.createRoom('room1', 'room1')
const room2 = user5.createRoom('room2', 'room2')
const arr1 = [user2, user3, user4]
const arr2 = [user6, user7, user8]
arr1.forEach((user)=>{
  user.setRoom(room1)
})
arr2.forEach((user)=>{
  user.setRoom(room2)
})

arr1.forEach((user)=>{
  user.message('typeshii room1')
})
arr2.forEach((user)=>{
  user.message('typeshii room2')
})

arr1.forEach((user) => {
  user.leaveRoom(room1)
})
arr2.forEach((user) => {
  user.leaveRoom(room2)
})

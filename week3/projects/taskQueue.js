import {EventEmitter} from 'node:events';

class TaskQueue extends EventEmitter{
  #queue
  constructor() {
    super()
    this.#queue=[]
  }
  
  addTask(task){
    const promisify =(fun) => {
      return {
        task: function(arg){
          return new Promise((resolve, reject) => {
            try {
              resolve(fun.task(...arg))
            } catch (e) {
              reject(e)
            }
          })
        },
        arguement:[...fun.arguement]
      }
    }
    this.#queue.push(promisify(task))
  }
  
  async execute(){
    const self = this
    console.log(self.#queue)
    await(async()=>{
      while (self.#queue.length>0) {
        await (async ()=>{
          let t = self.#queue.shift()
          try {
	    const x = t.task(t.arguement)
            const data = await x
            this.emit("success", "Success!!!", data)
          } catch (e) {
            this.emit("error", "Error!!!", e)
          }
        })()
      }
    })()

    this.emit("end")
  }
}

const queue = new TaskQueue()
const fc = (time, f=false) => {
  if(!f){
    throw new Error("Error don happen")
  }

    return "successful shii"+time
}
for (let i = 0; i < 5; i++) {
  const time = Math.floor(Math.random() * 15)
  const f = Math.random() < 0.51 ? true : false
  queue.addTask({
    task: fc,
    arguement:[time, f],
  })
}

queue.on("end", () => {
  console.log('Task queue finished and errors handled gracefully')
})

queue.on("success", (message, data) => {
  console.log(message + "::: \n         " + data)
})

queue.on("error", (message, data) => {
  console.log(message + "::: \n         " + data)
})
queue.addTask({
 task: ()=>{setTimeout(()=>{
      console.log("testtttt")
    }, 3000)},
 arguement:[]
})
await queue.execute()

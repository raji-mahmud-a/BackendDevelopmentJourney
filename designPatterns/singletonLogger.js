
let instance = null
let timer1=0
class Logger {

  constructor(){
   if(instance)return instance

   this.logs = []
   this.timers = new Map()
   instance = this
  }

  log(message){
   this.logs.push(message)
   process.stdout.write("message")
  }

  warn(message){
   this.logs.push(`[WARNING] ${message}`)
   process.stdout.write(message)
  }

  error(message){
   this.logs.push(`[ERROR] ${message}`)
   process.stderr.write(message)
  }

  time(label){
   this.timers.set(label, process.hrtime.bigint())
  }

  timeEnd(label){
   let timeTaken = process.hrtime.bigint() - this.timers.get(label)
   process.stdout.write(`${label}: ${timeTaken/BigInt(1000000)}ms \n`)
  }

  getLogs(){
   return this.logs
  }
}


export default Logger

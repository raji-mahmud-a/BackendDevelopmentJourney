import http from "node:http"
import { match } from "path-to-regexp"

const PORT = 20941
const TIMEOUT = 30 * 60 * 1000
const users = [
  {
    id: 0,
    "unique-trait": "He is gay.....",
    name: "Ezenna Great",
    username: "greatm3",
    age: 18,
    details: "idk what to say. let me just add an unnecessarily long lorem text of 100 characters::: ==> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    uniqueID: Date.now()
  },{
    id: 1,
    "unique-trait": "He is very cool....",
    name: "Raji Mahmud",
    username: "_Raji_Mahmud_",
    age: 16,
    details: "idk what to say. let me just add an unnecessarily long lorem text of 100 characters::: ==> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    uniqueID: Date.now()
  }
]

const server = http.createServer((req, res)=>{
  
try{
  const url = new URL(req.url, 'http://urlendpoint/')
  const path = url.pathname
  const params = url.searchParams
  const method = req.method
  const userEndpoint = match("/users/:id")(path)
  if (path === "/users") {
    if (method === 'GET') {
      if (params.get("age")) {
      if (!isNaN(Number(params.get("age"))) && params.get("age") !== '') {
        res.writeHead(200, {"content-type": "application/json"})
	      res.end(JSON.stringify({
	        success: true,
	        message: "User Data gotten successfully",
	        data: users.filter((val, idx)=> val.age === Number(params.get('age')))}
    	  , null, 2))
      }else{
        res.writeHead(400, {"content-type": "application/json"})
	      res.end(JSON.stringify({
	        success: false,
    	    message: 'Bad request',
    	    details: "The parameter (age) is meant to be a number"
    	  }, null, 2))
      }
    } else {
      res.writeHead(200, {"content-type": "application/json"})
	    res.end(JSON.stringify({
	      success: true,
	      message: 'Data gotten successfully',
	      data: users
	    }, null, 2))
    }
    }else if (method === 'POST') {
      let body =''
      req.on('data', (chunk)=>{body += chunk.toString()})
      req.on('end', ()=> {
        try {
          if (!body) {
            res.writeHead(400, {"content-type": "application/json"})
    	      return res.end(JSON.stringify({
    	        success: false,
        	    message: 'Bad Request',
        	    details: 'No data sent in request body'
        	  }, null, 2))
          }
          const data = JSON.parse(body)
          if (!data["unique-trait"] || !data.name || !data.username || !data.age || !data.details) {
            res.writeHead(400, {"content-type": "application/json"})
    	      return res.end(JSON.stringify({
    	        success: false,
        	    message: 'Bad Request',
        	    details: 'Missing required fields'
        	  }, null, 2))
          }
          
          data.id = users.length
          data.uniqueID = Date.now()
          
          users.push(data)
          res.writeHead(201, {"content-type": "application/json"})
  	      res.end(JSON.stringify({
  	        success: true,
  	        message: 'user created successfully',
  	        data: data
  	      }, null, 2)) 
        } catch (e) {
          res.writeHead(400, {"content-type": "application/json"})
          res.end(JSON.stringify({
            success: false,
            message: 'Invalid JSON',
            details: 'The request body is not valid JSON format.'
          }, null, 2))
        }
      })
    }
  } else if (userEndpoint && userEndpoint.path.startsWith("/users/")) {
    if (method === 'DELETE') {
      const indexToDelete = users.findIndex(item => item.id === Number(userEndpoint.params.id));
      if (indexToDelete !== -1) {
        users.splice(indexToDelete, 1);
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({
          success: true,
          message: "The resource was deleted successfully",
          data: null
        }, null, 2))
      } else {
        res.writeHead(404, { "content-type": "application/json" })
        return res.end(JSON.stringify({
          success: false,
          message: 'Resource not Found',
          details: "The resource with the specified id could not be found"
        }, null, 2))
      }
    }else if (method === 'PATCH') {
      let body = ''
      req.on('data', (chunk) => { body += chunk.toString() })
      req.on('end', () => {
        try {
          if (!body) {
            res.writeHead(400, { "content-type": "application/json" })
            return res.end(JSON.stringify({
              success: false,
              message: 'Bad Request',
              details: 'No data sent in request body'
            }, null, 2))
          } else if (users[Number(userEndpoint.params.id)] === undefined) {
            res.writeHead(404, { "content-type": "application/json" })
            return res.end(JSON.stringify({
              success: false,
              message: 'Not Found',
              details: "The resource you're looking for cannot be found"
            }, null, 2))
          }
          const data = JSON.parse(body)
          for (let key in data) {
            users[Number(userEndpoint.params.id)][key] = data[key]
          }
          
          res.writeHead(204, { "content-type": "application/json" })
          res.end(JSON.stringify({
            success: true,
            message: 'user updated successfully',
            data: users[Number(userEndpoint.params.id)]
          }, null, 2))
        } catch (e) { 
          res.writeHead(400, {"content-type": "application/json"})
          res.end(JSON.stringify({
            success: false,
            message: 'Invalid JSON',
            details: 'The request body is not valid JSON format.'
          }, null, 2))
        }
      })
    }
  } else {
  res.writeHead(404, { "content-type": "application/json" })
  res.end(JSON.stringify({
    success: false,
    message: 'Not Found',
    details: "The resource you're looking for cannot be found"
  }, null, 2))
}
}catch(e){
  	console.log("**** An Internal Server Error Occurred ***", e)
  	res.writeHead(500, {"content-type": "application/json"})
  	res.end(JSON.stringify({
  	  success: false,
  	  message: 'An internal Server Error Occurred',
  	  details: 'Please Try again Later or contact the developer'
  	}))
  }
  
})
server.setTimeout(TIMEOUT, ()=> {
  console.log('a connection timed out')
})
server.listen(PORT, ()=>{
  console.log(`Server Started on port ${PORT}`)
})


import http from "node:http"
import { match } from "path-to-regexp"
import * as fs from 'node:fs/promises';

const PORT = 20941
const TIMEOUT = 30 * 60 * 1000

async function getUsers() {
    try {
        const users = await fs.readFile('users.json', "utf8");
        return JSON.parse(users);
    } catch (error) {
        console.error('Error reading users:', error);
        throw new Error('Error reading users:', error)
    }
}

async function getHobbies() {
    try {
        const hobbies = await fs.readFile('hobbies.json', "utf8");
        return JSON.parse(hobbies);
    } catch (error) {
        console.error('Error reading hobbies:', error);
        throw new Error('Error reading hobbies:', error)
    }
}

async function writeHobbies(content) {
    try {
        await fs.writeFile('hobbies.json', JSON.stringify(content, null, 2),"utf8");
    } catch (error) {
        console.error('Error writing hobbies:', error);
        throw new Error('Error writing hobbies:', error)
    }
}

async function writeUsers(content) {
  try {
    await fs.writeFile('users.json', JSON.stringify(content, null, 2), "utf8");
  } catch (error) {
    console.error('Error writing users:', error);
    throw new Error('Error writing users:', error)
  }
}

const controller = async (req, res)=>{
  
try{
  const users = await getUsers()
  const hobbies = await getHobbies()
  
  
  const url = new URL(req.url, `http:${req.headers.host}/`)
  const path = url.pathname
  const params = url.searchParams
  const method = req.method
  const userEndpoint = match("/users/:id")(path)
  const hobbyEndpoint = match("/users/:id/hobbies/:hobbyID")(path)
  const getHobbyEndpoint = match("/users/:userID/hobbies")(path)
  const userParams = userEndpoint? userEndpoint.params.id : undefined
  const hobbyParams = hobbyEndpoint? hobbyEndpoint.params : {}
  if (path === "/users" || path === "/users/") {
    if (method === 'GET') {
      let age = params.get("age")
      if (age) {
      if (!isNaN(Number(age)) && age !== '') {
        res.writeHead(200, {"content-type": "application/json"})
	      res.end(JSON.stringify({
	        success: true,
	        message: "User Data gotten successfully",
	        data: users.filter((val, idx)=> val.age === Number(age))}
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
      req.on('end', async()=> {
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
          
          data.id = Math.floor(Math.random() * 5000)
          data.uniqueID = Date.now()
          data.hobbies = []
          
          users.push(data)
          await writeUsers(users)
          res.writeHead(201, {"content-type": "application/json", 'location':`/users/${data.id}`}) 
  	      res.end(JSON.stringify({
  	        success: true,
  	        message: 'user created successfully',
  	        data: data,
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
  } else if (userEndpoint || hobbyEndpoint) {
    if (userEndpoint && userEndpoint.path.startsWith("/users/")){
      if (method === 'DELETE') {
        const indexToDelete = users.findIndex(item => item.id === Number(userParams));
        if (indexToDelete !== -1) {
          users.splice(indexToDelete, 1);
          await writeUsers(users)
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
      } else if (method === 'PATCH') {
        let body = ''
        req.on('data', (chunk) => { body += chunk.toString() })
        req.on('end', async() => {
          try {
            const userIndex = users.findIndex(item => item.id === Number(userParams));
            if (userIndex === -1) {
                res.writeHead(404, { "content-type": "application/json" });
                return res.end(JSON.stringify({
                    success: false,
                    message: 'Not Found',
                    details: "The resource you're looking for cannot be found"
                }, null, 2));
            }
            if (!body) {
              res.writeHead(400, { "content-type": "application/json" })
              return res.end(JSON.stringify({
                success: false,
                message: 'Bad Request',
                details: 'No data sent in request body'
              }, null, 2))
            } 
            const data = JSON.parse(body)
            for (let key in data) {
              users[userIndex][key] = data[key]
            }
            await writeUsers(users)
            res.writeHead(200, { "content-type": "application/json" })
            res.end(JSON.stringify({
              success: true,
              message: 'user updated successfully',
              data: users[userIndex]
            }, null, 2))
          } catch (e) {
            res.writeHead(400, { "content-type": "application/json" })
            res.end(JSON.stringify({
              success: false,
              message: 'Invalid JSON',
              details: 'The request body is not valid JSON format.'
            }, null, 2))
          }
        })
      } else if (method === 'GET') {
        const user = users.find((val)=> val.id === Number(userParams))
        if (!user) {
          res.writeHead(404, { "content-type": "application/json" })
          return res.end(JSON.stringify({
            success: false,
            message: 'Not Found',
            details: `User with the id "${Number(userParams)}" is not found`
          }, null, 2))
        }
        
        res.writeHead(200, {"content-type": "application/json"})
  	    res.end(JSON.stringify({
  	      success: true,
  	      message: 'Data gotten successfully',
    	    data: user
  	    }, null, 2))
      }
    } else {
      const hobbyID = hobbyParams.hobbyID
      const userID = hobbyParams.id
      const method = req.method
      if (method === "GET") {
        const user = users.find((val)=> val.id === Number(userID))
        const userHobby = user.hobbies.find((val)=> val === Number(hobbyID))
        const hobby = hobbies.find((val)=> val.hobbyID === Number(hobbyID))
        
        if (!user || !userHobby || !hobby) {
          res.writeHead(404, {"content-type": "application/json"})
    	      return res.end(JSON.stringify({
    	        success: false,
        	    message: 'Not found',
        	    details: 'Hobby or User not found'
        	  }, null, 2))
        }
        const hobbyIdx = hobbies.findIndex((val)=> val.hobbyID === Number(hobbyID))
        
        const data = hobbies[hobbyIdx]
        
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({
          success: true,
          message: "Data gotten successfully",
          data: data
        }, null, 2))
        
      } else if (method === "DELETE") {
        const userIdx = users.findIndex((val)=> val.id === Number(userID))
        const hobbyIdx = hobbies.findIndex((val)=> val.hobbyID === Number(hobbyID))
        let userHobbyIdx;
        if (userIdx !== -1) {
          const user = users[userIdx];
          userHobbyIdx = user.hobbies.findIndex((val) => val === Number(hobbyID));
        }
        
        if (userIdx === -1 || userHobbyIdx === -1 || hobbyIdx === -1) {
          res.writeHead(404, {"content-type": "application/json"})
    	      return res.end(JSON.stringify({
    	        success: false,
        	    message: 'Not found',
        	    details: 'Hobby or User not found'
        	  }, null, 2))
        }
        
        hobbies.splice(hobbyIdx, 1)
        users[userIdx].hobbies.splice(userHobbyIdx, 1)
        await writeHobbies(hobbies)
        await writeUsers(users)
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({
          success: true,
          message: "The resource was deleted successfully",
          data: null
        }, null, 2))
        
      } else {
        res.writeHead(405, { "content-type": "application/json" })
        return res.end(JSON.stringify({
          success: false,
          message: 'Method not allowed',
          details: `The method "${method}" is not allowed on this specific endpoint "${path}"`
        }, null, 2))
      }
    }
  } else if (getHobbyEndpoint.params) {
    const { userID } = getHobbyEndpoint.params
    const method = req.method
    if (method === "GET") {
      const user = users.find((val) => val.id === Number(userID))
      if (!user) {
        res.writeHead(404, { "content-type": "application/json" })
        return res.end(JSON.stringify({
          success: false,
          message: 'Not Found',
          details: `User with the id "${Number(userID)}" is not found`
        }, null, 2))
      }

      const data = []
      user.hobbies.forEach((value, idx)=>{
        const hob = hobbies.find((val)=> val.hobbyID === value)
        data.push(hob)
      })

      res.writeHead(200, { "content-type": "application/json" })
      res.end(JSON.stringify({
        success: true,
        message: 'Data gotten successfully',
        data: data
      }, null, 2))
      
    } else if (method === "POST") {
      let body =''
      req.on('data', (chunk)=>{body += chunk.toString()})
      req.on('end', async()=> {
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
          if (!data.hobby || !userID) {
            res.writeHead(400, {"content-type": "application/json"})
    	      return res.end(JSON.stringify({
    	        success: false,
        	    message: 'Bad Request',
        	    details: 'Missing required fields'
        	  }, null, 2))
          }
          const user = users.find((val)=> val.id === Number(userID))
          
          if (!user) {
            res.writeHead(404, { "content-type": "application/json" })
            return res.end(JSON.stringify({
              success: false,
              message: 'Not Found',
              details: `User with the id "${userID}" is not found`
            }, null, 2))
          }
          
          data.userID = Number(userID)
          data.hobbyID = Math.floor(Math.random()*2000)
          let useridx = users.findIndex((val)=> val.id === Number(userID))
          users[useridx].hobbies.push(data.hobbyID)
          hobbies.push(data)
          await writeUsers(users)
          await writeHobbies(hobbies)
          res.writeHead(201, {"content-type": "application/json", 'location': `/users/${userID}/hobbies/${data.hobbyID}`}) 
  	      res.end(JSON.stringify({
  	        success: true,
  	        message: 'hobby created successfully',
  	        data: data,
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
    details: "The resource you're looking for cannot be found: check the URL very well"
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
  
}

const server = http.createServer(controller)

server.setTimeout(TIMEOUT, ()=> {
  console.log('a connection timed out')
})

server.listen(PORT, ()=>{
  console.log(`Server Started on port ${PORT}`)
})


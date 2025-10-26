import http from "node:http"
const PORT = 20941
const TIMEOUT = 30 * 60 * 1000
const users = ["Raji Mahmud", "Great Gay!!!"]
const server = http.createServer((req, res)=>{
try{
  const path = req.url
  
  if (path === "/users" && req.method === 'GET') {
    let endpoint = "users"
    res.writeHead(200, {
    	"content-type" : "text/html"
    })
    res.write(`
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>All ${endpoint}</title>
  <style>
    body{
      padding: 0.8rem;
      background: #00042D;
      color: #AFEDFF;
      text-align: center;
      min-height: calc(100vh - 2rem);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    li{
      text-align: start;
    }
    a{color:#fff;}
    div{
      margin: 3rem;
    }
  </style>
</head>

<body>
  <div>
    <h1>All ${endpoint}</h1>
  <p>All ${endpoint} are listed below</p>
  </div>
  
  <div>
    `)
    
    for (let i =0; i< users.length; i++) {
        res.write(`<li>${users[i]}</li>`)
    }
    
    res.end(`
  </div>
  
  
  <p>Visit the <a href="/user">/upload</a> page to add new user</p>
</body>

</html>
`)
  } else if (path === "/user/add" && req.method === 'POST') {
    let userN = ''
    req.on('data', (chunk)=>{
    	userN += chunk
    })

    req.on('end', ()=>{
    userN = JSON.parse(userN)
    users.push(userN["name"])
    res.writeHead(201,{"content-type":"application/json"} )
    res.end(JSON.stringify({
    	status: "cool",
    	message: "idk what to write btw"
    }))
    })
  } else if (path === "/user" && req.method === 'GET') {
  let endpoint = path.user
  res.writeHead(200, {"content-type": "text/html"})
  res.write(`
    <!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title></title>
  <style>
    body{
      padding: 0.8rem;
      background: #00042D;
      color: #AFEDFF;
      text-align: center;
      min-height: calc(100vh - 2rem);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    a{color: #FFB1B1;}
    li{
      text-align: start;
    }
    
    div{
      margin: 3rem;
    }
    form{
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      text-align: left;
    }
    button{
      padding: 0.6rem;
      background: #AFEDFF;
      outline: none;
      border: none;
      width:100%;
      border-radius: 0.4rem;
      font-size: 1rem;
    }
    
    input{
      padding: 0.6rem;
      background: #EEFBFF;
      outline: none;
      border: none;
      width:100%;
      border-radius: 0.4rem;
      font-size: 1rem;
    }
  </style>

</head>

<body>
  <div>
    <h1>All Users</h1>
  <p>All users are listed below</p>
  </div>
  
  <div>
    <form id="foRm">
      <label for="Name">Name</label>
      <input type="text" name="Name" id="Name" placeholder="Enter your name here"/>
      <button> Submit</button>
    </form>
  </div>
  
  
  <p>Visit the <a href="/upload">/upload</a> page to add new user</p>
  
    <script>
    const formEl = document.getElementById("foRm")
    formEl.addEventListener('submit', (e)=>{
      e.preventDefault()
      handleSubmit(document.getElementById("Name").value)
    })
    function handleSubmit(value){
      fetch('/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: value
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(\`HTTP error! status:\`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
          window.location.pathname = '/users';
        })
        .catch(error => {
          console.error('Error posting data:', error);
          alert('An error occurred')
        });

    }
  </script>
</body>

</html>
  `)
  res.end()
} else {
   let endpoint = path
    res.writeHead(404, {"content-type": "text/html"})
    res.write(`
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>All ${endpoint}</title>
  <style>
    body{
      padding: 0.8rem;
      background: #00042D;
      color: #AFEDFF;
      text-align: center;
      min-height: calc(100vh - 2rem);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    a{color:#fff;}
    li{
      text-align: start;
    }
    
    div{
      margin: 3rem;
    }
  </style>
</head>

<body>
  <div>
    <h1>FUCK YOU!!! <pre>${path}</pre> doesn't exist</h1>
    <p>Go somewhere else e.g <a href="/users">/users</a></p>
  </div>
</body>

</html>
`)
res.end()
  }
  }catch(e){
  	console.log("**** An Internal Server Error Occurred ***", e)
  	res.writeHead(500, {"content-type": "text/plain"})
	res.end(`An internal Server Error Occurred: ${e.message}`)
  }
  
})
server.setTimeout(TIMEOUT, ()=> {
  console.log('a connection timed out')
})
server.listen(PORT, ()=>{
  console.log(`Server Started on port ${PORT}`)
})

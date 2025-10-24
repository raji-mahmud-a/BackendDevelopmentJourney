import {pathToFileURL, fileURLToPath} from "node:url"

const urlString = 'https://auth:pass@api.mentor.io:1234/lessons/path?topic=url&level=deep&tag=node&tag=web#section1';
const url1 = new URL(urlString);
const log =(message)=>{
	console.log(message)
}

log("《======= URL Parts =======》")
log(url1.href)
log(url1.protocol)
log(url1.username)
log(url1.password)
log(url1.host)
log(url1.hostname)
log(url1.port)
log(url1.pathname)
log(url1.search)
log(url1.hash)
log(url1.origin)
log(url1.searchParams)


log("《======= Full URL Object =======》")
log(url1)

log("《======= URL Query Parameters Interface =======》")

const params = url1.searchParams

log(params)
log(params.get("topic"))
log(params.getAll("tag"))
log(params.set("topic", "Advance URL learning"))
log(params.get("topic"))
log(params.append("student", "studentA"))
log(params.has("level"))
log(params.delete("level"))
log(params.has("level"))
log(params)

log("《======= URL Construction =======》")
log(new URL("/mah/mud/raji", "https://www.mahmud.com"))

log("《======= URL File Path Utility =======》")
const filePath = "/ra/ji/mah/mud"
const URLLink = pathToFileURL(filePath)
log(pathToFileURL(filePath))
log(fileURLToPath(URLLink))

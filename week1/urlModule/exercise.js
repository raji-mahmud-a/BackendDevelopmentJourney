// this is a solution to an exercise 

// EXERCISE

/*

Code Challenge: ==》  
	You are writing an Express middleware function.
	Given a raw request path: e.g (/search?tags=node.js&limit=5).
	Write the most concise and reliable code snippet to read the tags parameter 
	and change the limit to 10, 
	then print the new full URL.

*/

// this is an example base url 
// and this will be provided from the req.url field

const BASE_URL = "https://example.mahmud.com/"

// the main function and it takes the relative path+query string as parameter
const readParam = path =>{
	const reqURL = new URL(path, BASE_URL)
	console.log(reqURL.searchParams.getAll("tags"))
	reqURL.searchParams.set("limit", 10)

	return new URL(reqURL.href)
}

// tests

/*

const test = readParam("/search?tags=nodejs&tags=python3&limit=6")
console.log(test)

*/

# Working with URLS in Node.js 
Basically there are 2 ways provided by Node.js for handling, modifying and formatting URLS, which are:

  - The ` WHATWG ` specification Global URL class (RECOMMENDED).
  - The old legacy ` node:url ` import which is deprecated and not advised.

---

### What is WHATWG?
  ` WHATWG ` stands for ` Web Hypertext Application Technology Working Group` and they provide and implement the specifications for valid urls and how they should be formatted.
  
### What is URL?
  ` URL ` stands for ` Uniform Resource Locator ` which is a uniform unique address used to locate resources across the web.
  
---

## The WHATWG Global URL Class / constructor 
  The URL class is a constructor class globally available in Node.js that can be used to manage, read and modify complex URL strings by breaking them into parts.
  
### The anatomy of the URL object

| URL Section |  | purpose / use|
|:-----|:-:|:------|
| href |  |This is the full standardized and encoded `url` string |
| origin |  | the protocol + hostname + port |
| Protocol |  |The access scheme and protocol for the `url` connection `e.g ftp:, http:, https: etc.` |
| username |  | The username specified before the host: often for ftp: its deprecated for http: |
| password |  | The password specified before the host: often for ftp: its deprecated for http: |
| host |  | The hostname plus the port number |
| hostname |  | Just the domain name or the IP address|
| port |  | The network port for the URL connection |
| pathname |  | The relative path to the resource from the host |
| search |  | The full query string including the `?` |
| Hash |  | The fragment identifier including the `#` (used on frontend for navigation to specific section)|
| searchParams |  | This is an object and also another constructor that handles all the queries for the url and also provides methods for modifying these queries...|


### Example

For the url:

 - `https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash`

The following is the result of the constructor 

``` javascript

URL {
  href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash',
  origin: 'https://sub.example.com:8080',
  protocol: 'https:',
  username: 'user',
  password: 'pass',
  host: 'sub.example.com:8080',
  hostname: 'sub.example.com',
  port: '8080',
  pathname: '/p/a/t/h',
  search: '?query=string',
  searchParams: URLSearchParams { 'query' => 'string' },
  hash: '#hash'
}

```
---
 
## URL Query Parameters 
  The searchParams object inside of the URL class instance gives us an interface to read, modify and access query parameters safely.
  
### URLSearchParams interface
  It's through this interface that we can safely access, manage and modify our query parameters 
  
  - It can be accessed from the URL class' searchParams property 
  - It automatically handles encoding and decoding for the query parameters and this enables us to write to the query parameters without stressing about url encoding `e.g converting " " to "%20"` 

### The URLSearchParams Methods:

| method |  | purpose  |
|:-----|:-:|:------|
| `.get(name)` |  | returns the first value associated with the parameter `name`|
| `.getAll(name)` | returns an array of all values associated with parameter `name`|
| `.set(name, value)` |  | sets parameter `name` to a value `value` and removes the former values |
| `.append(name, value)` |  | adds a new parameter  with the given `name` and `value` without deleting existing ones |
| `.delete(name)` |  | deletes all parameters with the name `name` |
| `.has(name)` |  | returns a boolean which indicates if a parameter with that name exists |

> URLSearchParams automatically handles encoding and decoding 

### URL construction
  The URL constructor can also be used to construct construct new urls
  
  **Either by:**
  - modifying the properties of the URL class
  - or the URL construction syntax using the format below
  ```javascript
    new URL("/relative/url/path", BASE_URL)
  ```
  And the constructor automatically handles encoding and formatting including removing trailing `/`

## Node.js file path utility 

  Node.js provides 2 API'S to work with file paths also
  
  ***Note***
  > These 2 api's are under the legacy `node:url` module and they can be imported and destructured like so::
  
  `import { pathToFileURL, fileURLToPath } from "node:url"`
  when using ESM modules 
  
  and

  `const { pathToFileURL, fileURLToPath } = require("node:url")`
  when using CommonJS
  
---
  
# The Legacy `url` API and why we avoid it
  
  The reason the `url` API is avoided is because it doesn't handle encoding and this can introduce a lot of bugs into our application it only returns a javascript plain object.
  
---
  
**Resources:**
- [Node.js HTTP Docs](https://nodejs.org/api/url.html)
- [Node.js Official Guides](https://nodejs.org/en/docs/guides/)
- Some code examples can be found in the `index.js` file and it can be ran using `npm run start`

---

**Code Challenge:**

> You are writing an Express middleware function. Given a raw request path: e.g (/search?tags=node) Write the most concise and reliable code snippet and change the limit to 10, then print the new full URL.

- The solution to the challenge can be found in the `challenge.js` file and it can be ran using `npm run challenge`

---

# Author

- Raji Mahmud Adeyemi

- [Send Me An Email](raji.mahmud.a@gmail.com) 

- [Contact me on X](mailto:https://x.com/_Raji_Mahmud_) 

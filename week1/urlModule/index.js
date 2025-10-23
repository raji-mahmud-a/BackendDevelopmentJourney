const urlString = 'https://api.mentor.io/lessons?topic=url&level=deep&tag=node&tag=web';
const myUrl = new URL(urlString);

// 1. Get the searchParams object
const params = myUrl.searchParams;

console.log(`--- Query Manipulation ---`);

// A. Reading Values (Getters)
console.log(`The 'topic': ${params.get('topic')}`);     // url (gets the first occurrence)
console.log(`All 'tag' values: ${params.getAll('tag')}`);// [ 'node', 'web' ]

// B. Mutating Values (Setters)
// Replace the 'level' parameter
params.set('level', 'master');

// Add a new 'sort' parameter
params.append('sort', 'asc');

// Delete the 'topic' parameter
params.delete('topic');

// 2. See the results (The URL object automatically updates)
console.log(`\n--- Resulting URL Object ---`);
console.log(`New Raw Search: ${myUrl.search}`); 
// Output: ?level=master&tag=node&tag=web&sort=asc

console.log(`New Full Href: ${myUrl.href}`);
// Output: https://api.mentor.io/lessons?level=master&tag=node&tag=web&sort=asc
// Manually setting this would break the URL: ?filter=A&B
params.set('filter', 'Item A & Item B');

console.log(`Encoded Search: ${myUrl.search}`);
// Output: ?level=master&tag=node&tag=web&sort=asc&filter=Item+A+%26+Item+B
// The `URLSearchParams` automatically encoded the '&' into '%26' and the space into '+', 
// ensuring the query remains valid.

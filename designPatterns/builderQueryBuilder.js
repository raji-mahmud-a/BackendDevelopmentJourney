class Query{
 constructor(){
  this.table=""
  this.fields=["*"]
  this.conditions=[]
  this.orderBy=null
  this.limitValue=null
 }
}

class QueryBuilder{
 #query
 constructor(){
  this.#query = new Query()
 }

 select(...fields){
  if(fields.length < 1){
   return this
  }
  this.#query.fields=fields
  return this
 }

 from(table){
  this.#query.table=table
  return this
 }

 where(condition){
  this.#query.conditions.push(condition)
  return this
 }

 orderBy(field){
  this.#query.orderBy=field
  return this
 }

 limit(number){
  this.#query.limitBy=number
  return this
 }

 build(){
  let queryString = `SELECT ${this.#query.fields.join(", ")} FROM ${this.#query.table} `

  if(this.#query.conditions.length > 0)queryString+=`WHERE ${this.#query.conditions.join(" AND")} `

  if(this.#query.orderBy)queryString+=`ORDER BY ${this.#query.orderBy} `

  if(this.#query.limitValue)queryString+=`LIMIT ${this.#query.limitValue} `

  return queryString
 }

 static createQuery(){
  return new QueryBuilder()
 }
}


const query1 = new QueryBuilder()
    .select('name', 'email')
    .from('users')
    .where('age > 18')
    .where("status = 'active'")
    .orderBy('name')
    .limit(10)
    .build();

console.log(query1);
// "SELECT name, email FROM users WHERE age > 18 AND status = 'active' ORDER BY name LIMIT 10"

const query2 = new QueryBuilder()
    .select('*')
    .from('products')
    .where('price < 100')
    .build();

console.log(query2);
// "SELECT * FROM products WHERE price < 100"

const query3 = new QueryBuilder()
    .select('id', 'title', 'created_at')
    .from('posts')
    .orderBy('created_at')
    .limit(5)
    .build();

console.log(query3);
// "SELECT id, title, created_at FROM posts ORDER BY created_at LIMIT 5"

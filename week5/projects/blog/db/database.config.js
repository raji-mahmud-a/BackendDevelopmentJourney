import sqlite from "node:sqlite"
import path from 'path';
import process from 'process';

let instance

class Database {
 constructor() {
  try {
   if(instance)return instance
   console.log(instance)
   this.db = new sqlite.DatabaseSync(process.cwd() + "/app.db")
   instance = this
   // **** SETUP DB PRAGMAs **** //
    this.db.run('PRAGMA foreign_keys = ON;');
    this.db.run('PRAGMA journal_mode = WAL;');
    this.db.run('PRAGMA busy_timeout = 5000;');
    this.db.run('PRAGMA synchronous = NORMAL;');
    console.log(instance)
   // create necessary tables
   this.createTables()
  }catch(error){
   console.error("Error creating Database dhii", error)
   process.exit(0)
  }
 }

 createTables(){
   const tables =[
    `
     CREATE TABLE IF NOT EXISTS posts(
      id INT PRIMARY KEY UNIQUE NOT NULL AUTOINCREMENT
      featuredImage VARCHAR(255)
      title VARCHAR(50)
      content VARCHAR(32768)
      slug VARCHAR(255) NOT NULL UNIQUE
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      status ENUM("draft", "published") DEFAULT "draft"
      viewCount INT DEFAULT 0
     );
    `
   ]

    this.db.exec(tables.join("/n"))
  }

   shutdown(){
    if(this.db) this.db.close()
    console.log("server shutting down gracefully:::: \n Database closed")
    process.exit(0)
  }
}

const db = new Database

export default db

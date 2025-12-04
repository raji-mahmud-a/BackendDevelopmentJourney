import db from "../db/database.config.js"

const checkSlug=(slug)=>{
 return db.findSlug(slug)
}

export default checkSlug

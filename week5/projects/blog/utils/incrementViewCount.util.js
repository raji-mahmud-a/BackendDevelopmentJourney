import db from "../db/database.config.js"

const incrementViewCount =(slug)=>{
 db.incrementViewCount(slug)
}

export default incrementViewCount

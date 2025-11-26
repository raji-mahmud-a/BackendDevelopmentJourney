import slugify from 'slugify';

const createSlug =(text)=>{

 if(!text)return undefined

 const slug = slugify(text, {
  replacement: '-',
  remove: /[*+~.()'"!:@]/g,
  lower: true,
  strict: true,
  locale: 'en',
  trim: true
 });

 return slug
}

export default createSlug

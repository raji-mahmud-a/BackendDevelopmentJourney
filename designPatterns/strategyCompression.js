
class ZipCompression{
 compress(file){
  return `Compressing [${file}] using ZIP (high compression)`
 }
}

class RarCompression{
 compress(file){
  return `Compressing [${file}] using RAR (maximum compression)`
 }
}

class GzipCompression{
 compress(file){
  return `Compressing [${file}] using GZIP (fast compression)`
 }
}

class FileCompressor{
 constructor(){
  this.strategy = null
 }

 setStrategy(strategy){
  this.strategy = strategy
 }

 compress(fileName){
  if(!this.strategy)return "No compression strategy specified!!"
  return this.strategy.compress(fileName)
 }

}

const compressor = new FileCompressor();

compressor.setStrategy(new ZipCompression());
console.log(compressor.compress('document.txt'));

compressor.setStrategy(new GzipCompression());
console.log(compressor.compress('image.png'));

const compressor2 = new FileCompressor();
console.log(compressor2.compress('test.txt'));

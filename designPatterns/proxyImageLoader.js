class RealImage{
 constructor(fileName){
  console.log(`Loading image from disk: ${fileName}`)
  this.fileName=fileName
 }

 display(){
  console.log(`Displaying ${this.fileName}`)
 }
}

class ImageProxy{
 #image
 #fileName
 constructor(fileName){
  this.#image=null
  this.#fileName=fileName
 }

 display(){
  if(this.#image){
   return this.#image.display()
  }

  this.#image =new RealImage(this.#fileName)
  this.#image.display()

 }
}

console.log("--- Using RealImage (loads immediately) ---");
const realImage = new RealImage("photo.jpg");
// Should log: "Loading image from disk: photo.jpg" immediately
console.log("Image object created, but not displayed yet");
realImage.display();
// Should log: "Displaying photo.jpg"
realImage.display();
// Should log: "Displaying photo.jpg" (no reloading)

console.log("\n--- Using ImageProxy (lazy loading) ---");
const proxyImage = new ImageProxy("wallpaper.jpg");
// Should NOT log anything yet
console.log("Proxy created, image not loaded yet");

proxyImage.display();
// Should log: "Loading image from disk: wallpaper.jpg"
// Then log: "Displaying wallpaper.jpg"

proxyImage.display();
// Should ONLY log: "Displaying wallpaper.jpg" (already loaded)

proxyImage.display();
// Should ONLY log: "Displaying wallpaper.jpg" (still using cached)

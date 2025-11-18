class TV{
 constructor(){}
 on(){console.log("TV is ON")}
 off(){console.log("TV is OFF")}
 setInput(input){console.log(`Input set to ${input}`)}
}

class SoundSystem{
 constructor(){}
 on(){console.log("Sound system is ON")}
 off(){console.log("Sound system is OFF")}
 setVolume(level){console.log(`Volume set to ${level}`)}
}

class DVDPlayer{
 constructor(){}
 on(){console.log("DVD Player is ON")}
 off(){console.log("DVD Player is OFF")}
 play(movie){console.log(`Playing ${movie}`)}
}

class Lights{
 constructor(){}
 on(){console.log("Lights are ON")}
 dim(level){console.log(`Lights dimmed to ${level}%`)}
}

class HomeTheaterFacade{
 constructor(TV, Sound, DVD, Light){
  this.TV=TV
  this.Sound=Sound
  this.DVD=DVD
  this.Light=Light
 }

 watchMovie(movie){
  this.Light.dim(10)
  this.TV.on()
  this.TV.setInput("DVD")
  this.Sound.on()
  this.Sound.setVolume(5)
  this.DVD.on()
  this.DVD.play(movie)
 }

 endMovie(){
  this.DVD.off()
  this.Sound.off()
  this.TV.off()
  this.Light.on()
 }
}

const tv = new TV();
const sound = new SoundSystem();
const dvd = new DVDPlayer();
const lights = new Lights();

const homeTheater = new HomeTheaterFacade(tv, sound, dvd, lights);

console.log("--- Starting movie night ---");
homeTheater.watchMovie("Inception");

console.log("\n--- Movie finished ---");
homeTheater.endMovie();

class Stock{
 constructor(name, price){
  this.name=name
  this.price=price
  this.subscribers=[]
 }

 setPrice(newPrice){
  this.subscribers.forEach((observer)=>{
   observer.update(this.name, newPrice)
  })
 }

 subscribe(observer){
  this.subscribers.push(observer)
 }

 unsubscribe(observer){
  this.subscribers = this.subscribers.filter((val)=> observer !== val)
 }
}

class Investor{
 constructor(name){
  this.name = name
 }

 update(stockName, price){
  console.log(`${this.name}  notified: [${stockName}] is now $${price}`)
 }
}


const tesla = new Stock('TSLA', 250);

const investor1 = new Investor('Warren');
const investor2 = new Investor('Elon');

tesla.subscribe(investor1);
tesla.subscribe(investor2);

tesla.setPrice(300);

tesla.unsubscribe(investor1);

tesla.setPrice(350);

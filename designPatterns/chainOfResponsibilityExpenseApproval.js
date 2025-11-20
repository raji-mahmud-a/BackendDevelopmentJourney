class Approver{
 constructor(){
  this.next=null
 }

 setNext(approver){
  this.next=approver
  return approver
 }

 approve(expense){
  if(this.next){return this.next.approve(expense)}
  return "Expense requires board approval..."
 }
}

class TeamLead extends Approver{
 approve(expense){
  if(expense.amount <= 1000)return `TeamLead approved $${expense.amount} for ${expense.purpose}`

  console.log("TeamLead cannot approve, escalating...")
  return super.approve(expense)
 }
}

class Manager extends Approver{
 approve(expense){
  if(expense.amount <= 5000)return `Manager approved $${expense.amount} for ${expense.purpose}`

  console.log("Manager cannot approve, escalating...")
  return super.approve(expense)
 }
}

class Director extends Approver{
 approve(expense){
  if(expense <= 20000)return `Director approved $${expense.amount} for ${expense.purpose}`

  console.log("Director cannot approve, escalating...")
  return super.approve(expense)
 }
}

class CEO extends Approver{
 approve(expense){
  return `CEO approved $${expense.amount} for ${expense.purpose}`
 }
}


// Set up the chain
const teamLead = new TeamLead();
const manager = new Manager();
const director = new Director();
const ceo = new CEO();

teamLead.setNext(manager).setNext(director).setNext(ceo);

// Test different expense amounts
console.log(teamLead.approve({ amount: 500, purpose: "Office supplies" }));
// "TeamLead approved $500 for Office supplies"

console.log(teamLead.approve({ amount: 3000, purpose: "New computers" }));
// TeamLead cannot approve, escalating...
// "Manager approved $3000 for New computers"

console.log(teamLead.approve({ amount: 15000, purpose: "Server upgrade" }));
// TeamLead cannot approve, escalating...
// Manager cannot approve, escalating...
// "Director approved $15000 for Server upgrade"

console.log(teamLead.approve({ amount: 100000, purpose: "Office renovation" }));
// TeamLead cannot approve, escalating...
// Manager cannot approve, escalating...
// Director cannot approve, escalating...
// "CEO approved $100000 for Office renovation"

console.log(teamLead.approve({ amount: 10000000, purpose: "Acquire competitor" }));
// (All escalate)
// "CEO approved $10000000 for Acquire competitor

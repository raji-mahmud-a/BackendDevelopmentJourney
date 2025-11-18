class StripePayment{
 constructor(){}
 makePayment(amount, currency, cardToken){
  return `Stripe: Charged ${amount} ${currency}`
 }
}

class PayPalPayment{
 constructor(){}
 sendPayment(dollarAmount, email){
  return `PayPal: Sent $${dollarAmount} to ${email}`
 }
}

class StripeAdapter{
 #base
 constructor(stripe){
  this.#base=stripe
 }

 processPayment(amount, details){
  const {currency, cardToken} = details
  return this.#base.makePayment(amount, currency, cardToken)
 }
}

class PayPalAdapter{
 #base
 constructor(paypal){
  this.#base=paypal
 }

 processPayment(amount, details){
  const { email }=details
  return this.#base.sendPayment(amount, email)
 }
}

// Original payment systems (incompatible interfaces)
const stripe = new StripePayment();
const paypal = new PayPalPayment();

// Wrap them in adapters
const stripeAdapter = new StripeAdapter(stripe);
const paypalAdapter = new PayPalAdapter(paypal);

// Now both use the same interface
console.log(stripeAdapter.processPayment(100, { currency: 'USD', cardToken: 'tok_123' }));
// "Stripe: Charged 100 USD"

console.log(paypalAdapter.processPayment(50, { email: 'user@example.com' }));
// "PayPal: Sent $50 to user@example.com"

// Your app can use them interchangeably
function checkout(paymentProcessor, amount, details) {
    return paymentProcessor.processPayment(amount, details);
}

console.log(checkout(stripeAdapter, 200, { currency: 'EUR', cardToken: 'tok_456' }));
console.log(checkout(paypalAdapter, 75, { email: 'buyer@example.com' }));

class Text{
 constructor(content){this.content=content}

 format(){
  return this.content
 }
}

class BoldDecorator{
 constructor(Text){this.content=Text}

 format(){
  return `<b>${this.content.format()}</b>`
 }
}

class ItalicDecorator{
 constructor(content){this.content=content}

 format(){
  return `<i>${this.content.format()}</i>`
 }
}

class UnderlineDecorator{
 constructor(content){this.content=content}

 format(){
  return `<u>${this.content.format()}</u>`
 }
}

let myText = new Text("Hello World");
console.log(myText.format());

myText = new BoldDecorator(myText);
console.log(myText.format());

myText = new ItalicDecorator(myText);
console.log(myText.format());

myText = new UnderlineDecorator(myText);
console.log(myText.format());

let text = new UnderlineDecorator(
    new ItalicDecorator(
        new BoldDecorator(
            new Text("Decorated!")
        )
    )
);
console.log(text.format());

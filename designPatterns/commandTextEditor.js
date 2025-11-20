class TextEditor{
 #content
 constructor(content){
  this.#content=""
 }

 write(text){
  this.#content += text
 }

 delete(numChars){
  let arr= this.#content.split("")
  arr.splice(arr.length - numChars, numChars)
  this.#content = arr.join("")
 }

 getContent(){
  return this.#content
 }
}

class WriteCommand{
 constructor(editor, text){
  this.editor=editor
  this.text=text
 }

 execute(){this.editor.write(this.text)}
 undo(){this.editor.delete(this.text.length)}
}


class DeleteCommand{
 constructor(editor, numChars){
  this.editor = editor
  this.numChars = numChars
  this.text=""
 }

 execute(){
  this.text= this.editor.getContent().slice(this.editor.getContent().length -this.numChars)
  this.editor.delete(this.numChars)
 }

 undo(){this.editor.write(this.text)}
}

class EditorHistory{
 #history
 constructor(){this.#history=[]}

 execute(command){
  command.execute()
  this.#history.push(command)
 }

 undo(){
  this.#history.pop().undo()
 }
}

const editor = new TextEditor();
const history = new EditorHistory();

history.execute(new WriteCommand(editor, "Hello"));
console.log(editor.getContent());

history.execute(new WriteCommand(editor, " World"));
console.log(editor.getContent());

history.execute(new DeleteCommand(editor, 6));
console.log(editor.getContent());

history.undo();
console.log(editor.getContent());

history.undo();
console.log(editor.getContent());

history.undo(); 
console.log(editor.getContent());

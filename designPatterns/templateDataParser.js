class DataParser {
  processFile(fileName){
    this.readFile(fileName)
    const res = this.parseData()
    this.validateData()
    this.processData()
    return res
  }
  
  readFile(fileName){
    console.log(`Reading file: ${fileName}`)
  }
  
  parseData(){
    throw new Error("Subclasses need to implement!!!")
  }
  
  validateData(){
    throw new Error("Subclasses need to implement!!!")
  }
  
  processData(){
    console.log('Processing data')
  }
  
}

class CSVParser extends DataParser {
  parseData(){
    console.log("Parsing CSV format")
    return { type: 'JSON', data: ["i no know wetin to talk"] }
  }
  
  validateData(){
    console.log("Validating CSV: Checking columns")
    return true
  }
}

class JSONParser extends DataParser {
  parseData(){
    console.log("Parsing JSON format")
    return { type: 'JSON', data: "i no know wetin to talk" }
  }
  
  validateData(){
    console.log("Validating JSON: Checkingstructure ")
    return true
  }
}

class XMLParser extends DataParser {
  parseData() {
    console.log("Parsing XML format")
    return { type: 'XML', data: "<i no know wetin to talk>"}
  }
  
  validateData() {
    console.log("Validating XML: Checking schema")
    return true
  }
}


const csvParser = new CSVParser();
const jsonParser = new JSONParser();
const xmlParser = new XMLParser();

console.log("--- CSV ---");
csvParser.processFile("data.csv");

console.log("\n--- JSON ---");
jsonParser.processFile("data.json");

console.log("\n--- XML ---");
xmlParser.processFile("data.xml");

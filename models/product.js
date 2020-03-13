const fs=require('fs');
const path=require('path');
//const products=[]; 
//we can save our product to a file instead of an array, so we need to work with the file system and import fs
module.exports=class Product {
    constructor(t) {
       this.title=t; 
    }
    save() {
        const p=path.join(path.dirname(process.mainModule.filename),'data','products.json');
        fs.readFile(p,(err,contentFile)=>{//since this is a json file, so the content of file should be in json format
          let products=[];  
          if(!err) {//Just means "if there is no error, then run this block of code".
            products=JSON.parse(contentFile);//parse data to JS object
          }
          products.push(this);
          fs.writeFile(p,JSON.stringify(products),err=>{
              if(err) throw err;
              console.log(' write file')});
        });
    }
    static fetchAll(callback) {
        const p=path.join(path.dirname(process.mainModule.filename),'data','products.json');
        fs.readFile(p,(err,contentFile)=>{
          if(err) {
           cb([]);
          }
        callback(JSON.parse(contentFile));});  
    }
}
const fs=require('fs');
const path=require('path');
//const products=[]; 
//we can save our product to a file instead of an array, so we need to work with the file system and import fs
const p=path.join(path.dirname(process.mainModule.filename),'data','products.json');
const getProductsFromFile=callback=>{
  
        fs.readFile(p,(err,contentFile)=>{
          if(err) {callback([]);}
          else callback(JSON.parse(contentFile));}); 
}
module.exports=class Product {
    constructor(t) {
       this.title=t; 
    }
    save() {
        getProductsFromFile(products=>{ 
          products.push(this);
          fs.writeFile(p,JSON.stringify(products),err=>{//the callback get executed after finishing writing file
              if(err) throw err;
              console.log(' write file')});});
    }
    static fetchAll(callback) {
      getProductsFromFile(callback);
    }
}
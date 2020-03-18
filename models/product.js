const fs=require('fs');
const path=require('path');
//const products=[]; 
//we can save our product to a file instead of an array, so we need to work with the file system and import fs
const p=path.join(path.dirname(process.mainModule.filename),'data','products.json');
const getProductsFromFile=callback=>{//callback function will be called later once the readFile done which provides arguments(the reading result) for the callback
  
        fs.readFile(p,(err,contentFile)=>{
          if(err) {callback([]);}
          else callback(JSON.parse(contentFile));}); 
}
module.exports=class Product {
    constructor(id,t,imageUrl,price,description) {
       this.id=id;
       this.title=t;
       this.imageUrl=imageUrl;
       this.price=price;
       this.description=description;    
    }
    save() {
        getProductsFromFile(products=>{ 
          if(this.id) {//For submit the exsiting but updated product
            const existingProductIndex=products.findIndex(product=>product.id===this.id);
            const updatedProducts=[...products];
            updatedProducts[existingProductIndex]=this;
            fs.writeFile(p,JSON.stringify(updatedProducts),err=>{console.log(err)});
          }else {
            this.id=Math.random().toString();
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),err=>{//the callback get executed after finishing writing file
                if(err) throw err;
                console.log(' write file');});
          }
          });
    }
    static fetchAll(callback) {
      getProductsFromFile(callback);
    }
    static findById(id,cb) {
      getProductsFromFile(products=>{
        const product=products.find(cur=>cur.id===id);
        cb(product);
      });
    }
}
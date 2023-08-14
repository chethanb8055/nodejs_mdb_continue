const fs = require('fs');
// const index = fs.readFileSync('index.html', 'utf-8');
const model = require("../Model/product")
const Product = model.Product;

// only in create case the instance to be created
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    console.log(req.body);

    const savedProduct = await product.save();
    console.log('Product created:', savedProduct);
    
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating product' });
  }
};


//Read the data
exports.getAllProducts = async(req, res) => {
  //read all
  const query = Product.find()
  //sort price '1' means asc order
  // const product = await query.sort({price:1}).exec()
  //sort price '-1' means dsc order
  //http://localhost:3000/products?sort=1
  // below is limited to price sort only we can make sort by more flexble decided by url enter like title sort rating, sort etc can make
  // const product = await query.sort({pric e:req.query.sort}).exec()

    // below is limited to price sort only we can make sort by more flexble decided by url enter like title sort rating, sort etc can make
    //http://localhost:3000/products?rating=-1
    //http://localhost:3000/products?title=-1
    // const product = await query.sort(req.query).exec()
    //limit it give limited top limited data
    // const product = await query.sort(req.query).limit(3).exec()

    //2) multiple query
    // '[req.query.sort]' it braket bcz we get string from req.query so we have to store in braket
    const product = await query.sort({[req.query.sort]:req.query.order}).limit(req.query.limit).exec()

  //read on condition
  // const product = await Product.find({price:{$gt:600}})
  res.json(product)

  
};

exports.getProduct = async(req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id)
  res.json(product);
};
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try{
    const doc =await Product.findOneAndReplace({_id:id},req.body,{new:true})
    res.status(201).json(doc);
  }catch(err){
      console.log("err",err)
      res.status(400).json(err)
  }
};

//patch
exports.updateProduct = async(req, res) => {
  const id = req.params.id;
  try{
    const doc =await Product.findOneAndUpdate({_id:id},req.body,{new:true})
    res.status(201).json(doc);
  }catch(err){
      console.log("err",err)
      res.status(400).json(err)
  }
};
exports.deleteProduct = async(req, res) => {
  const id = req.params.id;
  try{
    const doc =await Product.findOneAndDelete({_id:id})
    res.status(201).json(doc);
  }catch(err){
      console.log("err",err)
      res.status(400).json(err)
  }
};

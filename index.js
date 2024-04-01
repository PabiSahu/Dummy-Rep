const express = require('express')
const path = require('path')
const app = new express()
const ejs = require ('ejs')
const templatepath =path.join(__dirname,'./view')
//------------------//
const bodyParser = require('body-parser');

  
  
  

// Middleware for parsing JSON
app.use(bodyParser.json());
//-----------------------//
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')
app.use(express.static('public'))
app.listen(5004,()=>{
    console.log('app listening on port 5004')
    app.get('/',(req,res)=>{
        //res.sendFile(path.resolve(__dirname,'page/index.html'))
        res.render('index')
    })
    app.get('/about',(req,res)=>{
        //res.sendFile(path.resolve(__dirname,'page/about.html'))
        res.render('about')
    })
    app.get('/contact',(req,res)=>{
        //res.sendFile(path.resolve(__dirname,'page/contact.html'))
        res.render('contact' , {data})

    })
    app.post('/sendmsg',async(req,res)=>{
      const username=req.body.username
      const email=req.body.email
      const password=req.body.password
      const passwordConfirm=req.body.passwordConfirm
      await collection.insertMany([{username,email,password,passwordConfirm}])
      res.send("data inserted successfully")
    })
    app.get('/post',(req,res)=>{
        //res.sendFile(path.resolve(__dirname,'page/post.html'))
        res.render('post')
    })
})
app.get('/setting',(req,res)=>{
  //res.sendFile(path.resolve(__dirname,'page/post.html'))
  res.render('setting')

})
//----------------------------//
app.get('/contact', async (req, res) => {
    try {
      const data = await Data.find();
      res.render('contact', { data });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.post('/sendmsg', async (req, res) => {
    try {
      const { username, email, password, passwordConfirm } = req.body;
      //res.send("data inserted successfully")
  
      // Save the data to MongoDB
      const newData = new Data({
        username,
        email,
        password,
        passwordConfirm,
      });
  
      await newData.save();
  
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
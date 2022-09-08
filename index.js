const express =require('express');
const mysql = require('mysql');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
app.use(bodyParser.json());
app.set('view engine','ejs');
app.set('views','./views');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Huydothe1999@',
    database : 'dbTest'
})

app.get('/staff/list',(req,res)=>{
    const sql = `select * from staff`
    connection.query(sql,(err,data)=>{
        if(err){
            throw new Error(err.message);
        }
        res.render('list',{staff : data});
    })
})

app.get('/create',(req, res)=>{
    res.render('create');
})

app.post('/staff/create', upload.none(),(req,res)=>{
    console.log(req.body)
    const sql = `insert into staff(name,age,address,position) value("${req.body.name}",${req.body.age},"${req.body.address}","${req.body.position}")`;
    connection.query(sql,(err,data)=>{
        if(err){
            throw new Error(err.message);
        }
        res.render("success");
    })
})

app.get('/staff/detail',(req,res)=>{
    const sql = `select * from staff where id=${req.query.id}`;
    connection.query(sql,(err,data)=>{
        if(err){
            throw new Error(err.message);
        }
        res.render("detail",{staff:data[0]});
    })
})

app.get('/staff/delete',(req,res)=>{
    const sql = `delete from staff where id = ${req.query.id}`;
    connection.query(sql,(err,data)=>{
        if(err){
            throw new Error(err.message);
        }
        res.writeHead(301,{location:'/staff/list'});
        res.end();
    })
})


app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})
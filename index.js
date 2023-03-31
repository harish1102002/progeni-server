const  exp = require("express");
const app = exp();
const cors= require("cors");
const m = require('mongodb').MongoClient;

let post=[],col=null
app.use(exp.json())
app.use(cors({
    origin:"*"
}))

m.connect("mongodb+srv://harish:harish7@cluster0.ffgjypz.mongodb.net/progeni").then((c)=>
col=c.db().collection("progeni")).then(()=>{
    col.find().forEach(e => post.push(e));});
    
app.get('/',(req,res)=>res.json(post))

app.post('/',(req,res)=>{
    col.insertOne(req.body.post)
    post.push(req.body.post)
    res.json(post)})

app.listen(process.env.PORT||8000)
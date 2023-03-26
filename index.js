const  exp = require("express");
const app = exp();
const cors= require("cors");
const m = require('mongodb').MongoClient;

let post=[],col=null
app.use(exp.json())
app.use(cors({
    origin:"",
    credentials: true
}))

m.connect("mongodb+srv://harish:harish7@cluster0.ffgjypz.mongodb.net/dummy").then((c)=>
col=c.db().collection("dummy")).then(()=>{
    col.find().forEach(e => post.push(e));});

app.get('/',(req,res)=>res.json(post))

app.listen(process.env.PORT||8000)
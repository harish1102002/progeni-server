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
    if(req.body.keys().length==1){
    col.insertOne(req.body.post)
    post.push(req.body.post)
    res.json(post)}
    else{
    col.updateOne({id:req.body.id},{$set:{ts:"Paid"}});
    for(let i=0;i<post.length;i++)
    if(post[i].id==req.body.id)
    post[i].ts="Paid";
    res.json(post);
    }
    })

app.listen(process.env.PORT||8000)
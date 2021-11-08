const { log } = require("console");
const express = require("express");
const fs =require("fs")


const app = express();
const PORT =5000;

app.use(express.json());

function addTFile(move){

    fs.writeFile("./movies.json",JSON.stringify(move),()=>{
        console.log("done");
    })
}

app.get("/",(req,res)=>{
fs.readFile("./movies.json",(err,data)=>{
 let newMov= JSON.parse(data.toString());
 let favMove = newMov.filter((item)=> (item.isDel === false))

res.status(200).json(favMove);
}) 
});


app.get("/moveFav",(req,res)=>{
    fs.readFile("./movies.json",(err,data)=>{
     let newMov= JSON.parse(data.toString());
    
    let favMove = newMov.filter((item)=> (item.isfav === true))
    console.log(favMove);
    res.status(200).json(favMove);
    }) 
    });

app.get("/move",(req,res)=>{
    fs.readFile("./movies.json",(err,data)=>{
     let newMov= JSON.parse(data.toString());
     const {id}= req.query;
console.log(newMov);
       const fIndex = newMov.find(p => p.id === Number(id));
    
     console.log(fIndex);
    res.status(200).json(fIndex);
    }) 
    });


    app.post("/add",(req,res)=>{
        fs.readFile("./movies.json",(err,data)=>{
            let newMov= JSON.parse(data.toString());
            const addMove= req.body.name;
            newMov.push({id:newMov.length, name:addMove,isfav:false,isDel:false})
            addTFile(newMov);
            res.status(200).json(newMov);
    })
    })

    app.put("/update/:id",(req,res)=>{
        fs.readFile("./movies.json",(err,data)=>{
            let newMov= JSON.parse(data.toString());
           const editName = req.body.name;
           const {id}= req.params;
            
            newMov.splice(id-1,1,{id: Number(id),name:editName,isfav:false,isDel:false})
            addTFile(newMov);
            res.status(200).json(newMov);
    })

  
})

app.put("/softDel/:id",(req,res)=>{
    fs.readFile("./movies.json",(err,data)=>{
        let newMov= JSON.parse(data.toString());
       
       const {id}= req.params;
        
        newMov.splice(id-1,1,{id: Number(id),name:newMov[id-1].name,isfav: newMov[id-1].isfav,isDel:true})
        addTFile(newMov);
        res.status(200).json(newMov);
})


})

app.listen(PORT,()=>{
    console.log(PORT);
})
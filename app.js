const express = require('express');

const app = express();

app.get('/', function(req, res){
    res.status(200).json({msg: "Seja benvindo ao servidor do Salão"})
});

app.listen(3000, function(){
    console.log("Servidor está no ar!");
});
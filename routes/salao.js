const express = require('express');
const router = express.Router();
const Salao = require('../models/Salao');

router.post("/", async (req, res) => {
    try {
        const salaoExist = await Salao.findOne({ email: req.body.email });
        if (salaoExist) { 
            res.status(400).json({ msg: "Já existe um cadastro com esse email" }); 
        } else {
            const novoSalao = await new Salao(req.body).save();
            res.status(201).json(novoSalao);
        }
    } catch (err) {
        //console.log(err);
        res.status(500).json({ msg: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const salao = await Salao.findByIdAndDelete({ _id: req.params.id });
        if (!salao) {return res.status(404).json({ msg: "Salão não encontrado"})}
        res.status(201).json({ msg: `O salao ${salao.nome} foi eliminado`});
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Erro interno, tente mais tarde" });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const salao = await Salao.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!salao) return res.status(404).json({ msg: "Salão não encontrado" });
        res.status(201).json(salao);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Erro interno, tente mais tarde" });
    }
});

router.get("/", async (req, res) => {
    try {
        const salaos = await Salao.find();
        res.status(200).json( salaos );
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Erro interno, tente novamente mais tarde." })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const salao = await Salao.findById({ _id: req.params.id });
        if (!salao) { return res.json({ msg: "Salão não encontrado" }) }
        res.status(200).json(salao);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Erro interno, tente mais tarde "})
    }
});

module.exports = router;
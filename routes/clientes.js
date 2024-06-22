const express = require("express");
const Cliente = require("./../models/Cliente");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:id", getCliente, (req, res) => {
  res.status(200).json(res.cliente.nome);
});

router.post("/", async (req, res) => {
  const data = req.body;
  const cliente = new Cliente({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    genero: req.body.genero,
    dataNascimento: req.body.dataNascimento,
    email: req.body.email,
    telefone: req.body.telefone,
    imagem: req.body.imagem,
  });

  try {
    const existeCliente = await Cliente.findOne({ email: cliente.email });
    if (existeCliente != null) {
      res.status(400).json({ msg: "O email inserido não está disponível" });
    } else {
      const novoCliente = await cliente.save();
      res.status(201).json(novoCliente);
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.patch("/:id", getCliente, async (req, res) => {
  if (req.body.nome != null) {
    res.cliente.nome = req.body.nome;
  }
  try {
    const clienteActualizado = await res.cliente.save();
    res.status(200).json(clienteActualizado);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.delete("/:id", getCliente, async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(res.cliente.id);
    res.status(200).json({ msg: "Eliminado!" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

async function getCliente(req, res, next) {
  let cliente;
  try {
    cliente = await Cliente.findById(req.params.id);
    if (cliente == null) {
      return res.status(404).json({ msg: "Cliente não encontrado" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
  res.cliente = cliente;
  next();
}

module.exports = router;

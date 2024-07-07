const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const Servico = require("../../models/Servico");
const ColaboradorSalao = require("../../models/relationship/colaboradorSalao");

const getServico = async (req, res) => {
  try {
    const servicos = await Servico.find();
    res.status(200).json({ servicos, usuario: req.usuarioId });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const createServico = async (req, res) => {
  const sessao = await mongoose.startSession(); // Sessão para garantir operações atómicas
  sessao.startTransaction();

  try {
    const existServico = await Servico.findOne({
      tipo: req.body.tipo,
      salaoId: req.body.salaoId,
    });
    if (existServico) {
      return res.json({ msg: "Serviço já cadastrado." });
    }
    // Operações com model Serviço
    const servico = new Servico(req.body);
    await servico.save({ sessao });
    // Operações com model ColaboradorSalao
    const colaboradorSalao = new ColaboradorSalao({
      colaboradorId: req.body.colaboradorId,
      salaoId: req.body.salaoId,
    });
    await colaboradorSalao.save({ sessao });

    await sessao.commitTransaction();
    res.status(201).json(servico);
  } catch (err) {
    await sessao.abortTransaction();
    console.log(err);
    res.status(500).json({ msg: "Erro ao salvar dados" });
  }
};

module.exports = { getServico, createServico };

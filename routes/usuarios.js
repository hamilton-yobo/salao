const express = require("express");
const Usuario = require("./../models/Usuario");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:id", getUsuario, (req, res) => {
  res.status(200).json(res.usuario);
});

router.post("/", async (req, res) => {
  // const data = req.body;
  const usuario = new Usuario({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    genero: req.body.genero,
    dataNascimento: req.body.dataNascimento,
    email: req.body.email,
    telefone: req.body.telefone,
    imagem: req.body.imagem,
    senha: req.body.senha,
    role: req.body.role,
  });

  try {
    const existeUsuario = await Usuario.findOne({ email: usuario.email });
    if (existeUsuario != null) {
      res.status(400).json({ msg: "O email inserido não está disponível" });
    } else {
      const novoUsuario = await usuario.save();
      res.status(201).json(novoUsuario);
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});
/*
router.patch("/:id", getUsuario, async (req, res) => {
  if (req.body.nome != null) {
    res.usuario.nome = req.body.nome;
  }
  try {
    const usuarioActualizado = await res.usuario.save();
    res.status(200).json(usuarioActualizado);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});
*/
router.patch('/:id', async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const {
      nome, sobrenome, genero, dataNascimento, email, telefone, senha,
      endereco, imagem, role
    } = req.body;
    
    const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioId, {
      nome, sobrenome, genero, dataNascimento, email, telefone, senha,
      endereco, imagem, role
    }, {new:true});

    if (!usuarioActualizado) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    /*if (!(req.body.genero == 'Masculino' || req.body.genero == 'Feminino')) {
      return res.json({ msg: 'Género deve ser Masculino ou Feminino' })
    }*/
    res.status(201).json(usuarioActualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao atualizar usuário.' });
  }
});

router.delete("/:id", getUsuario, async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(res.usuario.id);
    res.status(200).json({ msg: "Eliminado!" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

async function getUsuario(req, res, next) {
  let usuario;
  try {
    usuario = await Usuario.findById(req.params.id);
    if (usuario == null) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
  res.usuario = usuario;
  next();
}

module.exports = router;

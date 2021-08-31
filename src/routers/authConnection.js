require("dotenv").config();

const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = Router();

// Models
const Usuarios = require("../models/users");

// Routers
router.post("/token", async (req, res) => {
  const { username, password } = req.body;
  
  /*
  const usuario = await Usuarios.findOne(
    { username: username },
    { auditoria: 0 }
  );

  const user = new Usuarios({ username, password });
  user.password = bcrypt.hashSync(password, 10);
  await user.save();
  return res.status(200).json(user);
  */

  try {
    const usuario = await Usuarios.findOne(
      { username: username },
      { auditoria: 0 }
    );

    if (!usuario)
      return res.status(500).json("El usuario ingresado es incorrecta.");

    // verify clave
    if (!bcrypt.compareSync(password, usuario.password)) {
      return res.status(500).json("La contraseña ingresada es incorrecta");
    } else {
      const token = jwt.sign({ _id: usuario._id }, process.env.SECRET_TOKEN, {
        expiresIn: 60 * 60 * 24,
      });
      res
        .status(200)
        .header("auth-token", token)
        .json({ _id: usuario._id, username: usuario.username });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;

require("dotenv").config();

const { Router } = require("express");
const jwt = require("jsonwebtoken");

const router = Router();

// Models
const Searchs = require("../models/searchs");

// Middelware
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .json({ mensaje: "El token ingresado es invalido" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(500).send({
      mensaje: "Se necesita un Token para poder operar.",
    });
  }
};

// Routers
router.post("/", verifyToken, async (req, res) => {
  const { search, user, office, branchoffice } = req.body;
  try {
    const data = new Searchs({ search, user, office, branchoffice });
    await data.save();
    return res.status(200).json("Los datos fueron almacenados correctamente");
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

module.exports = router;

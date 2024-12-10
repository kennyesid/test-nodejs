const { Router } = require("express");
const User = require("../models/user.model");
const { validateUser, generateToken } = require("../services/userService");
const verifyToken = require("../middleware/authMiddleware");
const routes = Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Obtiene un saludo
 *     responses:
 *       200:
 *         description: Saludo exitoso
 *         content:
 *           application/json:
 *             example:
 *               message: '¡Hola, mundo!'
 */
routes.get("/", (req, res) => {
  res.send({ message: "¡Hola, Test!" });
});

routes.post("/register", validateUser, async (req, res) => {
  const response = {};
  response.state = true;
  response.message = "Usuario registrado";
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(response);
  } catch (err) {
    response.state = false;
    response.message = "Error al registrar usuario";
    console.log("error: " + err.message);
    return res.status(400).json(response);
  }
});

routes.post("/login", async (req, res) => {
  const response = {};
  response.state = true;
  response.message = "Inicio de sesión exitoso";

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      response.state = false;
      response.message = "Usuario no encontrado";
      return res.status(404).json(response);
    }

    if (password !== user.password) {
      response.state = false;
      response.message = "Credenciales incorrectas";
      return res.status(401).json(response);
    }

    const token = generateToken(user);
    response.data = {
      token: token,
    };
    return res.status(200).json(response);
  } catch (err) {
    response.state = false;
    response.message = "Error en el servidor";
    console.log("error: " + err.message);
    return res.status(500).json(response);
  }
});

routes.get("/all", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al obtener usuarios", details: err.message });
  }
});

routes.put("/:id", validateUser, async (req, res) => {
  const { id } = req.params;
  const { name, email, type, password } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "no existe el usuario" });
    }

    user.name = name;
    user.email = email;
    user.type = type;
    user.password = password;

    await user.save();

    res.json({ message: "Usuario actualizado", user });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al actualizar usuario", details: err.message });
  }
});

routes.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "no existe el usuario" });
    }

    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

module.exports = routes;

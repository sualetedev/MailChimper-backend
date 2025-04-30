const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../services/jwt");

// Registro de usuario
const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        message: "Faltan datos por enviar",
        status: "error",
      });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "Correo electrónico ya registrado",
        status: "error",
      });
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: email.toLowerCase,
      password: passwordHashed,
    });

    await user.save();

    return res.status(201).send({
      message: "Usuario registrado correctamente",
      status: "success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: error.message || "Error interno en el servidor.",
      status: "error",
    });
  }
};

// Login de usuario
const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son requeridos.",
        status: "error",
      });
    }

    email = email.toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Usuario no encontrado.",
        status: "error",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Contraseña incorrecta.",
        status: "error",
      });
    }

    const token = jwt.createToken(user);

    res.status(200).json({
      status: "success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Error en el servidor.",
      status: "error",
    });
  }
};


const getProfile = async (req, res) => {
    try {
        let { id } = req.params;
        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado.',
                status: 'error',
            });
        }

        return res.status(200).json({
            status: 'success',
            user,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Error en el servidor.',
            status: 'error',
        });
    }
};


module.exports = {
  register,
  login,
  getProfile,
};

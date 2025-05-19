const express = require("express");
const router = express.Router();
const check = require("../middleware/auth");
const UserController = require("../controllers/UserController");

//Rutas
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Faltan datos o formato incorrecto
 *       500:
 *         description: Error interno en el servidor
 */

router.post("/register", UserController.register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login exitoso con token y datos del usuario
 *       400:
 *         description: Usuario no encontrado o credenciales incorrectas
 *       500:
 *         description: Error interno en el servidor
 */


router.post("/login", UserController.login);
/**
 * @swagger
 * /api/user/getProfile/{id}:
 *   get:
 *     summary: Obtener perfil de usuario por ID
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Perfil de usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */

router.get("/getProfile/:id", check.auth, UserController.getProfile);

module.exports = router;

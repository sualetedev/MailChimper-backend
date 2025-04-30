const express = require('express');
const router = express.Router();
const check = require('../middleware/auth');
const UserController = require('../controllers/UserController')


//Rutas
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Registro de usuario
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error en el registro
 */



router.post('/register', UserController.register);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login de usuario
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Error en login
 */



router.post('/login', UserController.login);

/**
 * @swagger
 * /user/getProfile:
 *   get:
 *     summary: Obtener perfil del usuario
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Perfil obtenido correctamente
 */
router.get('/getProfile/:id', check.auth, UserController.getProfile);

module.exports = router;
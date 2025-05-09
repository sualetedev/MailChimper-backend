const express = require('express');
const router = express.Router();
const check = require('../middleware/auth');
const AudienceController = require('../controllers/audienceController')

//Rutas

/**
 * @swagger
 * /audience/createAudience:
 *   post:
 *     summary: Crear una nueva audiencia
 *     tags:
 *       - Audience
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contacts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     location:
 *                       type: string
 *     responses:
 *       201:
 *         description: Audiencia creada correctamente
 */
router.post('/createAudience', check.auth, AudienceController.createAudience);

/**
 * @swagger
 * /audience/getAudience:
 *   get:
 *     summary: Obtener todas las audiencias
 *     tags:
 *       - Audience
 *     responses:
 *       200:
 *         description: Listado de audiencias
 */

router.get('/getAudience', check.auth, AudienceController.getAudience);

/**
 * @swagger
 * /audience/getAudiencebyId/{id}:
 *   get:
 *     summary: Obtener una audiencia por ID
 *     tags:
 *       - Audience
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Audiencia encontrada
 */
router.get('/getAudienceById/:id', check.auth, AudienceController.getAudienceById);
/**
 * @swagger
 * /audience/{id}:
 *   delete:
 *     summary: Eliminar una audiencia
 *     tags:
 *       - Audience
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Audiencia eliminada
 */
router.delete('/deleteAudience/:id', check.auth, AudienceController.deleteAudience);


module.exports = router;
const express = require('express');
const router = express.Router();
const check = require('../middleware/auth');
const SendController = require('../controllers/sendController')
/**
 * @swagger
 * /api/send/sendtoaudience:
 *   post:
 *     summary: Enviar un correo HTML a múltiples audiencias
 *     tags:
 *       - Envío
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - audienceIds
 *               - subject
 *               - html
 *             properties:
 *               audienceIds:
 *                 type: array
 *                 description: Array de IDs de audiencias
 *                 items:
 *                   type: string
 *               subject:
 *                 type: string
 *                 description: Asunto del correo
 *               html:
 *                 type: string
 *                 description: Contenido HTML del correo
 *     responses:
 *       200:
 *         description: Correos enviados exitosamente
 *       500:
 *         description: Error al enviar los correos
 */
router.post("/sendtoaudience", check.auth, SendController.sendToAudience)


module.exports = router;
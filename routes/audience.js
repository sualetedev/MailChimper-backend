const express = require("express");
const router = express.Router();
const check = require("../middleware/auth");
const AudienceController = require("../controllers/audienceController");

/**
 * @swagger
 * /createAudience:
 *   post:
 *     summary: Crear una nueva audiencia
 *     tags:
 *       - Audiences
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Clientes VIP
 *               contacts:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60f7f06a7c213e001c9d1a5b"]
 *     responses:
 *       201:
 *         description: Audiencia creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Audiencia creada
 *                 audience:
 *                   $ref: '#/components/schemas/Audience'
 *                 audienceId:
 *                   type: string
 *                   example: 60f7f07e7c213e001c9d1a5c
 *       400:
 *         description: Faltan datos por enviar
 *       500:
 *         description: Error interno del servidor
 */
router.post("/createAudience", check.auth, AudienceController.createAudience);
/**
 * @swagger
 * /getAudience:
 *   get:
 *     summary: Obtener todas las audiencias del usuario autenticado
 *     tags:
 *       - Audiences
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de audiencias obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 audiences:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Audience'
 *       404:
 *         description: No se han encontrado audiencias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: No se han entrando audiencias para este usuario
 *       500:
 *         description: Error interno del servidor
 */
router.get("/getAudience", check.auth, AudienceController.getAudience);
/**
 * @swagger
 * /api/audience/getAudienceById/{id}:
 *   get:
 *     summary: Obtener una audiencia específica por ID
 *     tags:
 *       - Audiencias
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la audiencia
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Audiencia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 audience:
 *                   $ref: '#/components/schemas/Audience'
 *       404:
 *         description: Audiencia no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: No se ha encontrado la audiencia
 *       500:
 *         description: Error interno en el servidor
 */
router.get(
  "/getAudienceById/:id",
  check.auth,
  AudienceController.getAudienceById
);

/**
 * @swagger
 * /api/audience/deleteAudience/{id}:
 *   delete:
 *     summary: Eliminar una audiencia específica
 *     tags:
 *       - Audiencias
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la audiencia a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Audiencia eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Audiencia eliminada
 *       404:
 *         description: Audiencia no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: No se ha encontrado la audiencia
 *       500:
 *         description: Error interno en el servidor
 */
router.delete(
  "/deleteAudience/:id",
  check.auth,
  AudienceController.deleteAudience
);

module.exports = router;

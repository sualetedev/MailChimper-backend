const express = require("express");
const router = express.Router();
const check = require("../middleware/auth");
const CampaignController = require("../controllers/campaignController");

//Rutas
/**
 * @swagger
 * /api/campaign/createCampaign:
 *   post:
 *     summary: Crear una nueva campaña
 *     tags:
 *       - Campañas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - templateId
 *               - subject
 *               - audienceIds
 *             properties:
 *               templateId:
 *                 type: string
 *               subject:
 *                 type: string
 *               audienceIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               sendDate:
 *                 type: string
 *                 format: date-time
 *               html:
 *                 type: string
 *     responses:
 *       201:
 *         description: Campaña creada correctamente
 *       400:
 *         description: Datos insuficientes
 *       500:
 *         description: Error del servidor
 */

router.post("/createCampaign", check.auth, CampaignController.createCampaign);
/**
 * @swagger
 * /api/campaign/getCampaigns:
 *   get:
 *     summary: Obtener todas las campañas del usuario
 *     tags:
 *       - Campañas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Campañas obtenidas correctamente
 *       500:
 *         description: Error al obtener campañas
 */
router.get("/getCampaigns", check.auth, CampaignController.getCampaigns);
/**
 * @swagger
 * /api/campaign/getCampaignsById/{id}:
 *   get:
 *     summary: Obtener una campaña por su ID
 *     tags:
 *       - Campañas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la campaña
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campaña obtenida correctamente
 *       404:
 *         description: Campaña no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get(
  "/getCampaignsById/:id",
  check.auth,
  CampaignController.getCampaignById
);

/**
 * @swagger
 * /api/campaign/updateCampaign/{id}:
 *   put:
 *     summary: Actualizar campaña
 *     tags:
 *       - Campañas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la campaña a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - subject
 *               - content
 *               - audienceId
 *             properties:
 *               title:
 *                 type: string
 *               subject:
 *                 type: string
 *               content:
 *                 type: string
 *               audienceId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Campaña actualizada correctamente
 *       400:
 *         description: Datos faltantes
 *       404:
 *         description: Campaña no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put(
  "/updateCampaign/:id",
  check.auth,
  CampaignController.updateCampaign
);
/**
 * @swagger
 * /api/campaign/deleteCampaign/{id}:
 *   delete:
 *     summary: Eliminar una campaña no enviada
 *     tags:
 *       - Campañas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la campaña
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campaña eliminada correctamente
 *       404:
 *         description: Campaña no encontrada
 *       500:
 *         description: Error del servidor
 */

router.delete(
  "/deleteCampaign/:id",
  check.auth,
  CampaignController.deleteCampaign
);
/**
 * @swagger
 * /api/campaign/clickCampaign:
 *   get:
 *     summary: Registrar clic en campaña (sin autenticación)
 *     tags:
 *       - Campañas
 *     parameters:
 *       - in: query
 *         name: campaignId
 *         required: true
 *         description: ID de la campaña
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Clic registrado correctamente
 *       404:
 *         description: Campaña no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/clickCampaign", CampaignController.ClickCampaign);
/**
 * @swagger
 * /api/campaign/updatehtml/{id}:
 *   put:
 *     summary: Actualizar el HTML de una campaña
 *     tags:
 *       - Campañas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la campaña
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - html
 *             properties:
 *               html:
 *                 type: string
 *     responses:
 *       200:
 *         description: HTML actualizado correctamente
 *       400:
 *         description: HTML faltante
 *       404:
 *         description: Campaña no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/updatehtml/:id", check.auth, CampaignController.updateHtml);
/**
 * @swagger
 * /getCampaignsWithAudienceCounts:
 *   get:
 *     summary: Obtiene campañas del usuario junto con el conteo de contactos por audiencia
 *     tags:
 *       - Campaigns
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de campañas con información básica y cantidad de contactos por audiencia
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
 *                   example: Campañas con audiencias y conteo obtenidas correctamente
 *                 campaigns:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       subject:
 *                         type: string
 *                       clickRate:
 *                         type: number
 *                       audiences:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                             contactCount:
 *                               type: integer
 *       401:
 *         description: No autorizado - token inválido o no enviado
 *       500:
 *         description: Error del servidor al obtener campañas
 */



router.get("/getCampaignsWithAudienceCounts", check.auth, CampaignController.getCampaignsWithAudienceCounts);

module.exports = router;

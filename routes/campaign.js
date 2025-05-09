const express = require('express');
const router = express.Router();
const check = require('../middleware/auth');
const CampaignController = require('../controllers/campaignController');


//Rutas

/**
 * @swagger
 * /campaign/createCampaign:
 *   post:
 *     summary: Crear una nueva campaña
 *     tags:
 *       - Campaign
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       201:
 *         description: Campaña creada correctamente
 */
router.post('/createCampaign', check.auth, CampaignController.createCampaign);


/**
 * @swagger
 * /campaign/getCampaigns:
 *   get:
 *     summary: Obtener todas las campañas
 *     tags:
 *       - Campaign
 *     responses:
 *       200:
 *         description: Listado de campañas
 */
router.get('/getCampaigns', check.auth, CampaignController.getCampaigns);

/**
 * @swagger
 * /campaign/getCampaignsById/{id}:
 *   get:
 *     summary: Obtener una campaña por ID
 *     tags:
 *       - Campaign
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campaña encontrada
 */
router.get('/getCampaignsById/:id', check.auth, CampaignController.getCampaignById);


/**
 * @swagger
 * /campaign/updateCampaign/{id}:
 *   put:
 *     summary: Actualizar una campaña
 *     tags:
 *       - Campaign
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *         description: Campaña actualizada
 */
router.put('/updateCampaign/:id', check.auth, CampaignController.updateCampaign);

/**
 * @swagger
 * /campaign/deleteCampaign/{id}:
 *   delete:
 *     summary: Eliminar una campaña
 *     tags:
 *       - Campaign
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campaña eliminada
 */
router.delete('/deleteCampaign/:id', check.auth, CampaignController.deleteCampaign);

router.get('/clickCampaign', CampaignController.ClickCampaign);

router.put('/updatehtml/:id', check.auth, CampaignController.updateHtml);








module.exports = router;
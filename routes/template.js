const express = require('express');
const router = express.Router();
const check = require('../middleware/auth');
const templateController = require('../controllers/templateController');

//Rutas


/**
 * @swagger
 * /template/createTemplate:
 *   post:
 *     summary: Crear una nueva plantilla
 *     tags:
 *       - Template
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Plantilla creada correctamente
 */
router.post('/createTemplate', check.auth, templateController.createTemplate);


/**
 * @swagger
 * /template/getTemplates:
 *   get:
 *     summary: Obtener todas las plantillas
 *     tags:
 *       - Template
 *     responses:
 *       200:
 *         description: Listado de plantillas
 */

router.get('/getTemplates', check.auth, templateController.getTemplates);
router.get('/getTemplateById/:id', check.auth, templateController.getTemplateById);
router.put('/updateTemplate/:id', check.auth, templateController.updateTemplate);
router.delete('/deleteTemplate/:id', check.auth, templateController.deleteTemplate);




module.exports = router;
const express = require("express");
const router = express.Router();
const check = require("../middleware/auth");
const templateController = require("../controllers/templateController");

//Rutas
/**
 * @swagger
 * /api/template/createTemplate:
 *   post:
 *     summary: Crear una nueva plantilla (template)
 *     tags:
 *       - Templates
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
 *               - content
 *             properties:
 *               name:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Template creada correctamente
 *       404:
 *         description: Faltan datos por enviar
 *       500:
 *         description: Error en el servidor
 */
router.post("/createTemplate", check.auth, templateController.createTemplate);
/**
 * @swagger
 * /api/template/getPublicTemplates:
 *   get:
 *     summary: Obtener plantillas públicas
 *     tags:
 *       - Templates
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Templates públicos obtenidos correctamente
 *       500:
 *         description: Error en el servidor
 */

router.get(
  "/getPublicTemplates",
  check.auth,
  templateController.getPublicTemplates
);
/**
 * @swagger
 * /api/template/getTemplates:
 *   get:
 *     summary: Obtener plantillas del usuario autenticado
 *     tags:
 *       - Templates
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Templates obtenidos correctamente
 *       500:
 *         description: Error en el servidor
 */

router.get("/getTemplates", check.auth, templateController.getTemplates);
/**
 * @swagger
 * /api/template/getTemplateById/{id}:
 *   get:
 *     summary: Obtener plantilla por ID
 *     tags:
 *       - Templates
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la plantilla
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Template obtenida correctamente
 *       404:
 *         description: Template no encontrada
 *       500:
 *         description: Error en el servidor
 */

router.get(
  "/getTemplateById/:id",
  check.auth,
  templateController.getTemplateById
);
/**
 * @swagger
 * /api/template/updateTemplate/{id}:
 *   put:
 *     summary: Actualizar una plantilla existente
 *     tags:
 *       - Templates
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la plantilla
 *         schema:
 *           type: string
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
 *       200:
 *         description: Template actualizada correctamente
 *       404:
 *         description: Template no encontrada
 *       500:
 *         description: Error en el servidor
 */

router.put(
  "/updateTemplate/:id",
  check.auth,
  templateController.updateTemplate
);
/**
 * @swagger
 * /api/template/deleteTemplate/{id}:
 *   delete:
 *     summary: Eliminar una plantilla
 *     tags:
 *       - Templates
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la plantilla
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Template eliminada correctamente
 *       404:
 *         description: Template no encontrada
 *       500:
 *         description: Error en el servidor
 */

router.delete(
  "/deleteTemplate/:id",
  check.auth,
  templateController.deleteTemplate
);

module.exports = router;

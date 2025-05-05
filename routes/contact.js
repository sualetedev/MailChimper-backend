const express = require('express');
const router = express.Router();
const check = require('../middleware/auth');
const ContactController = require('../controllers/contactController');

// Rutas 

/**
 * @swagger
 * /contacts/{audienceId}/add:
 *   post:
 *     summary: Agregar un nuevo contacto a una audiencia
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: audienceId
 *         required: true
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
 *               email:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contacto agregado
 */
router.post('/:audienceId/add', protect, contactController.addContact);

/**
 * @swagger
 * /contacts/{audienceId}:
 *   get:
 *     summary: Obtener todos los contactos de una audiencia
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: audienceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Listado de contactos
 */
router.get('/:audienceId', check.auth, contactController.getContactsByAudience);

/**
 * @swagger
 * /contacts/{audienceId}/{contactId}:
 *   get:
 *     summary: Obtener un contacto por ID en una audiencia
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: audienceId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contacto encontrado
 */
router.get('/:audienceId/:contactId', check.auth, contactController.getContactById);

/**
 * @swagger
 * /contacts/{audienceId}/{contactId}:
 *   put:
 *     summary: Actualizar un contacto en una audiencia
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: audienceId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contacto actualizado
 */
router.put('/:audienceId/:contactId', check.auth, contactController.updateContact);

/**
 * @swagger
 * /contacts/{audienceId}/{contactId}:
 *   delete:
 *     summary: Eliminar un contacto en una audiencia
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: audienceId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contacto eliminado
 */
router.delete('/:audienceId/:contactId', check.auth, contactController.deleteContact);

router.get('/getContactsByUser', check.auth , contactController.getContactsByUser)



module.exports = router;

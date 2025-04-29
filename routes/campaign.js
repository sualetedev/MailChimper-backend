const express = require('express');
const router = express.Router();
const check = require('../middleware/auth');
const CampaignController = require('../controllers/campaignController');


//Rutas

router.post('/createCampaign', check.auth, CampaignController.createCampaign);
router.get('/getCampaigns', check.auth, CampaignController.getCampaigns);
router.get('/getCampaignsById/:id', check.auth, CampaignController.getCampaignById);
router.put('/updateCampaign/:id', check.auth, CampaignController.updateCampaign);
router.delete('/deleteCampaign/:id', check.auth, CampaignController.deleteCampaign);








module.exports = router;
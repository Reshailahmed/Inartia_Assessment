const express = require("express");
const { createOffer, getOffers, getOfferById, updateOffer, deleteOffer,sendOfferEmail } = require("../controllers/offerController");

const router = express.Router();

router.post('/', createOffer);     
router.get('/', getOffers);        
router.get('/:id', getOfferById);  
router.put('/:id', updateOffer);  
router.delete('/:id', deleteOffer);
router.post("/:id/send-email", sendOfferEmail);

module.exports = router;

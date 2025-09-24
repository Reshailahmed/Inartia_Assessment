const express = require("express")
const {createTemplate, getTemplate,getTemplateById,updateTemplate,deleteTemplate,} = require("../controllers/templateController")

const router = express.Router();

router.post('/', createTemplate);
router.get('/', getTemplate);
router.get("/:id", getTemplateById);
router.put("/:id", updateTemplate);
router.delete("/:id", deleteTemplate);

module.exports = router;

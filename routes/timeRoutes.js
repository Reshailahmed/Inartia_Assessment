const express = require("express")
const {createTimeEntry, getTimeEntries} = require ("../controllers/timeController.js")

const router = express.Router()

router.post ('/', createTimeEntry);
router.get ('/', getTimeEntries);

module.exports = router;
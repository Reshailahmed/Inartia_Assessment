const TimeEntry = require("../models/TimeEntry");

exports.createTimeEntry = async(req, res) => {

    try {
        const {date,hour,activity,description} = req.body
        const entry = await TimeEntry.create({date,hour,activity,description});
        res.json(entry)
        
    } catch (error) {
        res.status(500).json({error: error.message})
        
    };

}

exports.getTimeEntries = async(req,res) => {
    try {
        const entries = await TimeEntry.findAll({ order: [["date", "DESC"]] })
     res.json(entries);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
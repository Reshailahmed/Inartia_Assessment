const Offer = require("../models/Offer");
const PDFDocument = require("pdfkit");
const transporter = require("../config/email");
const { PassThrough } = require("stream");


exports.createOffer = async (req, res) => {
  try {
    const offer = await Offer.create(req.body);
    res.status(201).json(offer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.findAll();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findByPk(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });
    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateOffer = async (req, res) => {
  try {
    const [updated] = await Offer.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedOffer = await Offer.findByPk(req.params.id);
      return res.json(updatedOffer);
    }
    res.status(404).json({ message: "Offer not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteOffer = async (req, res) => {
  try {
    const deleted = await Offer.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Offer not found" });
    res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.sendOfferEmail = async (req, res) => {
  try {
    const { id } = req.params;

    
    const offer = await Offer.findByPk(id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    
    const doc = new PDFDocument();
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", async () => {
      const pdfData = Buffer.concat(buffers);

    
      await transporter.sendMail({
        from: `"HR Department" <${process.env.EMAIL_USER}>`,
        to: offer.emailAddress,
        subject: "Your Job Offer Letter - Inartia Technologies",
        text: `Dear ${offer.fullname}, please find attached your job offer letter.`,
        attachments: [
          {
            filename: `${offer.fullname}-OfferLetter.pdf`,
            content: pdfData,
          },
        ],
      });

      res.json({ message: "Offer letter emailed successfully" });
    });

    await offer.update({ status: "Sent" });

res.json({ message: "Offer letter emailed successfully", status: "Sent" });

    
    doc.fontSize(18).text("Job Offer Letter", { align: "center" }).moveDown();
    doc.fontSize(12).text(`Date: ${offer.date}`);
    doc.moveDown();
    doc.text(`Dear ${offer.fullname},`);
    doc.moveDown();
    doc.text(
      `We are pleased to offer you the position of ${offer.position} in our ${offer.department} department.`
    );
    doc.text(`Annual Salary: ${offer.salary}`);
    doc.text(`Start Date: ${offer.date}`);
    doc.text(`Location: ${offer.location || "Office"}`);
    doc.moveDown();
    doc.text(
      "This offer is contingent upon successful completion of background checks."
    );
    doc.moveDown();
    doc.text("Sincerely,");
    doc.text("HR Department");
    doc.text("Inartia Technologies");

    doc.end();
  } catch (error) {
    console.error("Error sending offer email:", error);
    res.status(500).json({ message: "Error sending email", error: error.message });
  }
};

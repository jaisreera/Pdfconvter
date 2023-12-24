const PDFDocument = require('pdfkit');
const fs = require('fs');
const ImageModel = require('../models/imageModel');

exports.uploadImage = async (req, res) => {
  try {
    // Create a PDF document
    const doc = new PDFDocument();

    const userInput = req.body.text;
    // doc.pipe(fs.createWriteStream('output.pdf'));

    doc.text(`User Input: ${userInput}`,100, 100);

    // Pipe the PDF content to a buffer

    // doc.image(req.file.buffer, 100, 100, { width: 400, height: 400, align: 'center'});
    if (req.file) {
      const imgBuffer = req.file.buffer;
      doc.image(imgBuffer,{ width: 400, height: 400, align: 'center'});
    }


    const pdfBuffer = await new Promise((resolve, reject) => {
      const buffers = [];
      doc.on('data', buffer => buffers.push(buffer));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      // No need to pipe the document to itself
      doc.end();
    });

       // Generate a random filename using a timestamp and a random string
       const timestamp = Date.now();
       const randomString = Math.random().toString(36).substring(2, 8); // Use a random string of 6 characters
       const randomFileName = `${timestamp}_${randomString}.pdf`;

    // Store the image and PDF data in MongoDB
    const image = new ImageModel({
      data: req.file.buffer,
      contentType: req.file.mimetype,
      pdfPath: `/uploads/${randomFileName}`, // Adjust the path as needed
    });
    await image.save(); // Use await to ensure the image is saved before continuing
    const randomNumber = Math.random(6)
    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${randomFileName}`);

    // Send the PDF as a response
    res.end(pdfBuffer);
  } catch (error) {
    console.error(`Error handling file upload: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
};
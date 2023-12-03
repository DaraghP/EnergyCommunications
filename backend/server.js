// Fastify NodeJS Backend API to get, upload and download PDFs
const fastify = require('fastify')({ logger: true });
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

fastify.register(require('fastify-multipart'), { attachFieldsToBody: true });
const { PDFDocument} = require('pdf-lib');

const uploadDir = path.join(__dirname, 'uploads');

const fastifyCors = require('@fastify/cors');
const { createWriteStream } = require('fs');

// Had a CORS issue, this resolved it.
fastify.register(fastifyCors, {
  methods: ['GET', 'POST'],
});

// endpoint to upload PDF
fastify.post('/upload', async (request, reply) => {
    console.log("request.body:", request.body);
    const { file } = request.body;
    if (!file) {
        // error if no file provided
      reply.code(400).send({ error: 'No file provided' });
      return;
    }
    // add numbers at the end of filename to prevent same filename error
    const originalPath = path.join(__dirname, 'uploads', `${file.filename.slice(0, -4)}-${uuidv4()}.pdf`);
    try {

        await fs.writeFile(originalPath, file._buf, {encoding: null}, function(error){
            if(error){
                console.log("error writing file/...");
            }
            console.log("file written successfully");
        });
  
      const originalBuffer = await fs.readFile(originalPath);
  
      // using pdf-lib to add a page to the PDF
      const newFilePath = path.join(__dirname, 'uploads', `${file.filename.slice(0, -4)}-${uuidv4()}-with-cover.pdf`);
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
  
      // add page to PDF
      const { width, height } = page.getSize();
      const fontSize = 30;
      const text = 'Cover page... random text..';
      page.drawText(text, { x: width / 2,  y: height / 2, fontSize });
  
      const originalPdf = await PDFDocument.load(originalBuffer);

      // copy each page from original pdf to new pdf
      const copiedPages = await pdfDoc.copyPages(originalPdf, originalPdf.getPageIndices());
      copiedPages.forEach((page) => pdfDoc.addPage(page));
  
      // save new combined PDF to new path
      const newPDFContent = await pdfDoc.save();
      await fs.writeFile(newFilePath, newPDFContent);
  
      reply.code(200).send({ success: true });
    } catch (error) {
      console.error('Error processing file:', error);
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  });
  
  
// endpoint to get list of uploaded PDFS
fastify.get('/uploaded', async (request, reply) => {
  try {
    const files = await fs.readdir(uploadDir);
    const pdfFiles = files.filter((file) => file.endsWith('.pdf'));
    reply.send({ pdfFiles });
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
});

// endpoint to download a PDF
fastify.get('/download/:id', async (request, reply) => {
  const { id } = request.params;
  const filePath = path.join(uploadDir, id);

  try {
    const files = await fs.readdir(uploadDir);
    // if file is in uploads directory, send PDF
    if (files.includes(path.basename(filePath))) {
        const stream = await fs.readFile(filePath);
        reply.send(stream).code(200);
        console.log("pdf sent.");
    } else {
      reply.code(404).send({ error: 'File not found' });
    }
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
});
  
// start server listening on port 5000
const start = async () => {
  try {
    await fs.mkdir(uploadDir, { recursive: true });
    await fastify.listen(5000);
    fastify.log.info(`Server is listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    // process.exit(1);
  }
};

start();

// First time using Fastify, encountered many issues along the way. Couldn't manage to fix the PDF error before the deadline, but will try fix it in my own time on Sunday ahead of Monday on-site.
const fastify = require('fastify')({ logger: true });
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

fastify.register(require('fastify-multipart'), { attachFieldsToBody: true });
const { PDFDocument} = require('pdf-lib');

const uploadDir = path.join(__dirname, 'uploads');

const fastifyCors = require('@fastify/cors');

// Had a CORS issue, this resolved it.
fastify.register(fastifyCors, {
  methods: ['GET', 'POST'],
});

// endpoint to upload PDF
fastify.post('/upload', async (request, reply) => {
    const { file } = request.body;
    if (!file) {
      reply.code(400).send({ error: 'No file provided' });
      return;
    }
    // add numbers at the front of filename to prevent same filename error
    const originalPath = path.join(__dirname, 'uploads', `${uuidv4()}-${file.filename}`);
  
    try {
      await fs.writeFile(originalPath, file.file);
  
      // This is currently showing as empty even when sending non-empty PDFs. (Looking into it.)
      const originalBuffer = await fs.readFile(originalPath);
      console.log('Original PDF Content:', originalBuffer.toString());
  
      // using pdf-lib to add a page to the PDF
      const modifiedPath = path.join(__dirname, 'uploads', `${uuidv4()}-modified-${file.filename}`);
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
  
      // add page to PDF
      const { width, height } = page.getSize();
      const fontSize = 30;
      const text = 'random text';
      page.drawText(text, { x: width / 2,  y: height / 2, fontSize });
  
      const originalPdfDoc = await PDFDocument.load(originalBuffer);
      const [originalPage] = await pdfDoc.copyPages(originalPdfDoc, [0]);
      pdfDoc.addPage(originalPage);
  
      // save new combined PDF to new path
      const modifiedPdfBytes = await pdfDoc.save();
      await fs.writeFile(modifiedPath, modifiedPdfBytes);
  
      // Not working atm
      const modifiedBuffer = await fs.readFile(modifiedPath);
      console.log('Modified PDF Content:', modifiedBuffer.toString());
  
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
  const filePath = path.join(uploadDir, id + '_extended.pdf');

  try {
    const fileExists = await fs.access(filePath);
    if (fileExists) {
      reply.sendFile(filePath);
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
    process.exit(1);
  }
};

start();

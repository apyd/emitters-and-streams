import csv from 'csvtojson';
import { createReadStream, createWriteStream, constants } from 'fs';
import { access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const csvFilePath = join(__dirname, 'csv', 'sample.csv');
const jsonFilePath = join(__dirname, 'csv', 'sample.txt');

async function checkFileAccess(filePath) {
  try {
    await access(filePath, constants.R_OK);
  } catch (error) {
    console.error(`Cannot access file: ${filePath}`, error);
    return;
  }
}

async function convertCsvToJson(sourceFile, destinationFile) {
  await checkFileAccess(sourceFile);

  const readStream = createReadStream(sourceFile)
  const writeStream = createWriteStream(destinationFile)

  readStream.on('error', (error) => {
    console.error('Read stream failed.', error);
  })

  writeStream.on('error', (error) => {
    console.error('Write stream failed.', error);
  })

  try { 
    await pipeline(
      readStream,
      csv({ delimiter: 'auto' }),
      writeStream,
    );
    console.log('File content succesfully converted.');
  } catch (error) {
    console.error('Pipeline failed.', error);
  }
}

convertCsvToJson(csvFilePath, jsonFilePath);

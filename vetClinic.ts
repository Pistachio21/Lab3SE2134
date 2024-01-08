import { IncomingMessage, ServerResponse } from 'node:http';
import * as http from 'node:http';
import * as fs from 'node:fs';
const querystring = require('node:querystring')
import { insertValues, updateDatabaseValues, getTokenInput, showValues } from './showPatients';

async function handleRequest(request: IncomingMessage, response: ServerResponse) {
  const url = request.url;
  const method = request.method;

  if (url === '/vet-clinic') {
    try {
      const mainHTMLContent = fs.readFileSync('./main.html', 'utf-8');
      response.writeHead(200, { 'Content-Type': 'text/html' }).end(mainHTMLContent);
    } catch (error) {
      console.log("Error happened.", error)
    } 
  } else if (url === '/patients' && method === "POST") {
    let content = '';
    request.on('data', function(chunk) {
      content += chunk.toString();
    });
    request.on('end', async function() {
      let patientForm = querystring.parse(content)
      let patientName = patientForm.name
      let patientSpecies = patientForm.species
      let patientAge = patientForm.age
      let patientSickness = patientForm.sickness
      let patientDateAdmit = new Date()

      try {
        if (patientName !== undefined && patientSpecies !== undefined && 
          patientSickness !== undefined && !Number.isNaN(patientAge))
        await insertValues(
          {
            name: String(patientName),
            species: String(patientSpecies),
            age: Number(patientAge), 
            sickness : String(patientSickness),
            date_created : patientDateAdmit,
            date_updated : new Date()
          }
        )
      } catch (error) {
        console.log(error)
      }
    })
    const html = /* html */`
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>List of Patients</title>
    </head>
    <body>
    <form action = "/update-patients" method = "POST">
    Please refresh the page if there are no patients listed.<br>
   The current patients are as listed:<br>
   ${await showValues()} <br>
    <button>Click here to update a patient</button>
    </form>
    </body>
    </html>`;
  
    response.writeHead(200, { 'Content-Type': 'text/html' }).end(html);
  } else if (url === '/update-patients' && method === "POST") {
    let html = /* html */ `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Patient Verification</title>
      </head>
      <body>
      <form action = "/update-status" method = "POST">
      Enter the ID of the patient, and the patient's status:<br>
      Patient ID: <input type = "number" name="id"><br>
      Patient Status/Sickness: <input type = "text" name="status"><br>
      <button>Click to proceed</button>
        </form>
      </body>
      </html>
    `;
  response.writeHead(200, { 'Content-Type': 'text/html' }).end(html);
 } else if (url === '/update-status' && method === "POST") {
      
  let content = '';
  request.on('data', function(chunk) {
    content += chunk.toString();
  });
  request.on('end', async function() {
    let html = ''
    let input = querystring.parse(content)
    let petID = parseInt(input.id)
    let updatedStatus = String(input.status)
    const inputUser = await getTokenInput(petID)
    await updateDatabaseValues(updatedStatus, petID)
    
    try {
      if (inputUser) {
        html = /* html */
        `  <!DOCTYPE html>
        <html lang="en"> 
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
        <form action = "/patients" method = "POST">
        The patient's status has been updated successfully!
         <button>Click to return to list of patients.</button>
         </form>
        </body>
        </html>`
    } else {
      html = /* html */
      `  <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
     Invalid id detected.
      </body>
      </html>`
    }
  } catch(error) {
    console.log(error)
  }
  response.writeHead(200, { 'Content-Type': 'text/html' }).end(html);
})
}
}
const server = http.createServer(handleRequest);
server.listen(3000, () => {
  console.log('Server started at http://localhost:3000/vet-clinic');
});
import { Pool } from 'pg'
export const databaseData = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Lab 3',
  password: 'shawn',
  port: 5433
})

export async function insertValues(patient: {
  name: string, species: string, age: number,
  sickness: string, date_created: Date, date_updated : Date}) {

  try {
    const connectDatabase = await databaseData.connect()
    const pushData = await connectDatabase.query(`
    INSERT INTO vet_clinic(pet_name,species,age,sickness,created_at,updated_at) 
    VALUES($1, $2, $3, $4, $5, $6)`, [patient.name, patient.species, patient.age, patient.sickness,
    patient.date_created, patient.date_updated])
    return pushData
  } catch (error) {
    console.log(error)
  }
}
export async function showValues() {
    const getDatabaseValues = await databaseData.connect()
    const getPatientInfo = await getDatabaseValues.query('SELECT * FROM vet_clinic')
    let patientData = getPatientInfo.rows
    let patientInfo = ''
    for (let i = 0; i < patientData.length; i++) {
        patientInfo += 
        `
        Pet ID: ${patientData[i].pet_id}<br>
       Name: ${patientData[i].pet_name}<br>
        Species: ${patientData[i].species}<br>
        Age: ${patientData[i].age}<br>
       Status: ${patientData[i].sickness}<br>
        Date admitted: ${patientData[i].created_at}<br>
        Last update: ${patientData[i].updated_at}<br><br><br>`
    }
    return patientInfo
}


export async function getTokenInput(id: number) {
  const openDatabase = await databaseData.connect()
  const compareTokenInput = await openDatabase.query(`
  SELECT pet_name FROM vet_clinic
  WHERE pet_id = '${id}'`)
  let compareToDatabase = compareTokenInput.rows
  let showPatientName = ''
  
  for (let i = 0; i < compareToDatabase.length; i++) {
    showPatientName += compareToDatabase[i].pet_name
  }
  return showPatientName
}


export async function updateDatabaseValues(status: string, id: number) {
  const accessDatabase = await databaseData.connect()
  const updatePatient = await accessDatabase.query(`
  UPDATE vet_clinic SET sickness = '${status}' WHERE pet_id = ${id} `)
}
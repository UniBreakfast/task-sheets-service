module.exports = connectToTaskSheet

try { require('./env') } catch { }
const { GoogleSpreadsheet } = require('google-spreadsheet')

const sheetID = '1xngxywR7q373SXbWK8cUeC2lSYCjzLgUgOWqm0WDs-8'
const sheetDoc = new GoogleSpreadsheet(sheetID)

const sheetService = {getAllTaskData}


async function connectToTaskSheet() {
  await sheetDoc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  })

  await sheetDoc.loadInfo()
  const taskSheet = sheetDoc.sheetsByIndex[0]

  expose({taskSheet})

  return sheetService
}

async function getAllTaskData() {
  const headers = taskSheet.headerValues
  const rows = await taskSheet.getRows()
  const values = rows.map(row => row._rawData.map(val => val.trim()))
    .filter(rowData => rowData[0])

  return {headers, values}
}

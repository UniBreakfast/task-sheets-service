try { require('./env') } catch { }
const { GoogleSpreadsheet } = require('google-spreadsheet')

const sheetID = '1xngxywR7q373SXbWK8cUeC2lSYCjzLgUgOWqm0WDs-8'
const sheetDoc = new GoogleSpreadsheet(sheetID)

sheetDoc.useServiceAccountAuth({
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY,
}).then(proceedWithMain)

setTimeout(expose, 1e7)

expose({ sheetDoc })

async function proceedWithMain() {
  await sheetDoc.loadInfo()

  const [sh0, sh1] = sheetDoc.sheetsByIndex

  const sh0rawData = await grabRawSheetData(0)
  // const sh1rawData = await grabRawSheetData(1)


  expose({ sh0, sh1, sh0rawData })
}


async function grabRawSheetData(sheetIndex) {
  const sheet = sheetDoc.sheetsByIndex[sheetIndex]
  const rows = await sheet.getRows()

  const headers = sheet.headerValues
  const values = rows.map(row => row._rawData.map(val => val.trim()))

  return {rows, headers, values}
}



function expose(...objects) {
  objects.forEach(obj =>
    Object.entries(obj).forEach(([key, value]) =>
      globalThis[key] = expose[key] = value))

  console.dir(Object.fromEntries(Object.entries(expose)))
}

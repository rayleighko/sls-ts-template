
import axios from 'axios'
import { parseAsync } from 'json2csv';
import fs from 'fs'

let response = null
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get<any,any,any>(
      'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/map',
      {
        headers: {
          'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
        },
        params: {
          start:1,
          limit:100
        }
      },
    )
  } catch (ex) {
    response = null
    // error
    console.log(ex)
    reject(ex)
  }
  if (response) {
    // success
    const json = response.data
    const csv = await parseAsync(json.data)
    const dirPath = "./.sample"
    
    if(!fs.existsSync(dirPath)) fs.mkdirSync(dirPath)

    fs.writeFileSync(`${dirPath}/${Date.now()}.csv`,csv)
    resolve(csv)
  }
})

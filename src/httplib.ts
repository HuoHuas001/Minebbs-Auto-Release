import * as https from 'https'
import * as core from '@actions/core'

/**
 * @description HTTP client for the API
 *
 * @param {string} url - The URL of the API
 * @param {string} header - The Header to be used for authentication
 * @param {string} data - The HTTP method to be used
 */
export function postRelease(url:string, token:string, data:String) {
  const options:Object = {
    hostname: "api.minebbs.com",
    port: 443,
    path: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      "Authorization": "Bearer "+token
    }
  }

  const req = https.request(options, res => {
    core.debug(`Status Code: ${res.statusCode}`)
  
    res.on('data', d => {
      let datas = JSON.parse(d)
      core.debug(`data: ${d}`)
      if(datas.success){
        core.info("Release Success")
      }
      else{
        core.error(`Status Code:${datas.status} Message:${datas.message}`)
      }
    })
  })
  
  req.on('error', error => {
    core.error(error)
  })
  
  req.write(data)
  req.end()
}

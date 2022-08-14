import * as https from 'https'
import * as core from '@actions/core'

/**
 * @description HTTP client for the API
 *
 * @param {string} url - The URL of the API
 * @param {string} header - The Header to be used for authentication
 * @param {Object} data - The HTTP method to be used
 */
export function postRelease(url:string, header:string, data:Object) {
  let dataStr:string = JSON.stringify(data)
  const options:Object = {
    hostname: "api.minebbs.com",
    port: 443,
    path: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': dataStr.length
    }
  }

  const req = https.request(options, res => {
    core.debug(`Status Code: ${res.statusCode}`)
  
    res.on('data', d => {
      let data = JSON.parse(d)
      core.debug(`data: ${JSON.stringify(data)}`)
      if(data.success){
        core.info("Release Success")
      }
      else{
        core.error(`Status Code:${data.status} Message:${data.message}`)
      }
    })
  })
  
  req.on('error', error => {
    core.error(error)
  })
  
  req.write(data)
  req.end()
}

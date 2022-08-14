import * as core from '@actions/core'
import * as fs from 'fs'
const htl = require('./httplib.js')

async function run(): Promise<void> {
  try {
    /*{
      "title": "", // 更新标题
      "description": "", // 更新内容描述
      "new_version": "", // 新版本号
      "file_key": "", // 文件Key，只能上传一个文件(可选)
      "file_url": "" // 文件URL(可选)
    }*/
    //获取参数
    let description: string = ""
    let description_file:string = ""
    const resources: string = core.getInput('resources')
    const token: string = core.getInput('token');
    const title: string = core.getInput('title')
    const new_version: string = core.getInput('new_version')

    if(!!core.getInput('description_file')){
      description_file = core.getInput('description_file')
      description = fs.readFileSync(description_file, 'utf8')
    }
    else{
      description = core.getInput("description")
    }

    const file_url: string = core.getInput('file_url')

    //组合信息
    const submitUrl:string = `/api/openapi/v1/resources/${resources}/update`
    const data:Object = {
      "title": title,
      "description": description,
      "file_url": file_url,
      "new_version": new_version
    }
    let res = htl.postRelease(submitUrl, token, data)
  } 
  catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

import * as core from '@actions/core';
import * as fs from 'fs/promises'; // 使用 Promise 版本
import * as htl from './httplib';

interface ReleaseData {
  title: string;
  description: string;
  new_version: string;
  file_url?: string; // 明确可选字段
}

async function run(): Promise<void> {
  try {
    // 集中获取输入参数
    const inputs = {
      resources: core.getInput('resources', { required: true }),
      token: core.getInput('token', { required: true }),
      title: core.getInput('title', { required: true }),
      new_version: core.getInput('new_version', { required: true }),
      description: core.getInput('description'),
      description_file: core.getInput('description_file'),
      file_url: core.getInput('file_url'),
    };

    // 优先从文件读取描述（异步读取）
    const description = inputs.description_file
      ? (await fs.readFile(inputs.description_file, 'utf8')).replace(/\r/g, '')
      : inputs.description;

    // 验证必要字段
    if (!description) {
      throw new Error(
        'Either description or description_file must be provided'
      );
    }

    // 结构化调试输出
    core.debug(
      'Input parameters:\n' +
        JSON.stringify(
          {
            title: inputs.title,
            new_version: inputs.new_version,
            file_url: inputs.file_url,
            resources: inputs.resources,
            description_source: inputs.description_file ? 'file' : 'input',
          },
          null,
          2
        )
    );

    const releaseData: ReleaseData = {
      title: inputs.title,
      description,
      new_version: inputs.new_version,
      ...(inputs.file_url && { file_url: inputs.file_url }), // 条件添加可选字段
    };

    const submitUrl = `/api/openapi/v1/resources/${inputs.resources}/update`;
    await htl.postRelease(submitUrl, inputs.token, JSON.stringify(releaseData));
  } catch (error) {
    core.setFailed(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}

run();

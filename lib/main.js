"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs/promises")); // 使用 Promise 版本
const htl = __importStar(require("./httplib"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 集中获取输入参数
            const inputs = {
                resources: core.getInput('resources', { required: true }),
                token: core.getInput('token', { required: true }),
                title: core.getInput('title', { required: true }),
                new_version: core.getInput('new_version', { required: true }),
                description: core.getInput('description'),
                description_file: core.getInput('description_file'),
                file_url: core.getInput('file_url')
            };
            // 优先从文件读取描述（异步读取）
            const description = inputs.description_file
                ? (yield fs.readFile(inputs.description_file, 'utf8')).replace(/\r/g, '')
                : inputs.description;
            // 验证必要字段
            if (!description) {
                throw new Error('Either description or description_file must be provided');
            }
            // 结构化调试输出
            core.debug('Input parameters:\n' + JSON.stringify({
                title: inputs.title,
                new_version: inputs.new_version,
                file_url: inputs.file_url,
                resources: inputs.resources,
                description_source: inputs.description_file ? 'file' : 'input'
            }, null, 2));
            const releaseData = Object.assign({ title: inputs.title, description, new_version: inputs.new_version }, (inputs.file_url && { file_url: inputs.file_url }) // 条件添加可选字段
            );
            const submitUrl = `/api/openapi/v1/resources/${inputs.resources}/update`;
            yield htl.postRelease(submitUrl, inputs.token, JSON.stringify(releaseData));
        }
        catch (error) {
            core.setFailed(error instanceof Error ? error.message : 'Unknown error occurred');
        }
    });
}
run();

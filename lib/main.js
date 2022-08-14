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
const fs = __importStar(require("fs"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /*{
              "title": "", // 更新标题
              "description": "", // 更新内容描述
              "new_version": "", // 新版本号
              "file_key": "", // 文件Key，只能上传一个文件(可选)
              "file_url": "" // 文件URL(可选)
            }*/
            //获取参数
            let description = "";
            let description_file = "";
            const resources = core.getInput('resources');
            const token = core.getInput('token');
            const title = core.getInput('title');
            const new_version = core.getInput('new_version');
            if (!!core.getInput('description_file')) {
                description_file = core.getInput('description_file');
                description = fs.readFileSync(description_file, 'utf8');
            }
            else {
                description = core.getInput("description");
            }
            const file_url = core.getInput('file_url');
            core.debug(`description: ${description}`);
            core.debug(`description_file: ${description_file}`);
            core.debug(`resources: ${resources}`);
            core.debug(`title: ${title}`);
            core.debug(`new_version: ${new_version}`);
            core.debug(`file_url: ${file_url}`);
            //组合信息
            const submitUrl = `/api/openapi/v1/resources/${resources}/update`;
            core.debug(submitUrl);
            const data = {
                "title": title,
                "description": description,
                "file_url": file_url,
                "new_version": new_version
            };
            let dataStr = JSON.stringify(data);
            core.debug("data:" + dataStr);
            //let res = htl.postRelease(submitUrl, token, dataStr)
        }
        catch (error) {
            if (error instanceof Error)
                core.setFailed(error.message);
        }
    });
}
run();

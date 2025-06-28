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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRelease = void 0;
const https = __importStar(require("https"));
const core = __importStar(require("@actions/core"));
/**
 * @description HTTP client for the API
 *
 * @param {string} url - The URL of the API
 * @param {string} header - The Header to be used for authentication
 * @param {string} data - The HTTP method to be used
 */
function postRelease(url, token, data) {
    const options = {
        hostname: "api.minebbs.com",
        port: 443,
        path: url,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(data),
            Authorization: `Bearer ${token}`,
        },
        // rejectUnauthorized: false // 如需跳过证书验证，临时启用
    };
    const req = https.request(options, (res) => {
        let responseData = "";
        res.on("data", (chunk) => (responseData += chunk));
        res.on("end", () => {
            try {
                const result = JSON.parse(responseData);
                if (result.status === 2000) {
                    core.info(`Release Success: ${result.message}`);
                }
                else {
                    const errorMap = {
                        4000: '参数不正确 - 请检查资源ID/文件Key/JSON格式',
                        4030: '权限不足 - 没有操作该资源的权限',
                        5000: '服务器错误 - 请稍后重试'
                    };
                    const errorMessage = errorMap[result.status] || `未知错误 (状态码: ${result.status})`;
                    core.setFailed(`API请求失败: ${errorMessage}\n详细消息: ${result.message || '无'}`);
                    // 附加调试信息（非生产环境）
                    if (process.env.NODE_ENV !== 'production') {
                        core.debug(`完整响应: ${JSON.stringify(result, null, 2)}`);
                    }
                }
            }
            catch (err) {
                const errorMessage = `服务器返回了非JSON格式的响应，可能是API异常或防火墙拦截\n` +
                    `原始响应（前200字符）：${responseData.slice(0, 200)}...`;
                core.setFailed(errorMessage);
                // 开发环境下记录完整错误对象
                if (process.env.NODE_ENV !== 'production') {
                    core.debug(`完整错误信息：${err instanceof Error ? err.stack : String(err)}`);
                }
            }
        });
    });
    req.on("error", (error) => {
        const errorMessage = `网络请求失败: ${error.message}\n` +
            `可能原因：\n` +
            `1. 网络连接问题\n` +
            `2. API服务不可用\n` +
            `3. 证书验证失败`;
        core.setFailed(errorMessage);
        // 开发环境下记录完整错误信息
        if (process.env.NODE_ENV !== 'production') {
            core.debug(`完整网络错误: ${error.stack || JSON.stringify(error)}`);
        }
    });
    req.write(data);
    req.end();
}
exports.postRelease = postRelease;

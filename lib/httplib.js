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
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            "Authorization": "Bearer " + token
        }
    };
    const req = https.request(options, res => {
        core.debug(`Status Code: ${res.statusCode}`);
        res.on('data', d => {
            core.debug(`data: ${d}`);
            try {
                let datas = JSON.parse(d);
                if (datas.success) {
                    core.info("Release Success");
                }
                else {
                    core.error(`Status Code:${datas.status} Message:${datas.message}`);
                }
            }
            catch (err) {
                core.error(`Recive Data:${err}`);
            }
        });
    });
    req.on('error', error => {
        core.error(error);
    });
    req.write(data);
    req.end();
}
exports.postRelease = postRelease;

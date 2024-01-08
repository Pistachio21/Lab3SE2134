"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("node:http");
var fs = require("node:fs");
var querystring = require('node:querystring');
var showPatients_1 = require("./showPatients");
function handleRequest(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var url, method, mainHTMLContent, content_1, html, _a, html, content_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = request.url;
                    method = request.method;
                    if (!(url === '/vet-clinic')) return [3 /*break*/, 1];
                    try {
                        mainHTMLContent = fs.readFileSync('./main.html', 'utf-8');
                        response.writeHead(200, { 'Content-Type': 'text/html' }).end(mainHTMLContent);
                    }
                    catch (error) {
                        console.log("Error happened.", error);
                    }
                    return [3 /*break*/, 4];
                case 1:
                    if (!(url === '/patients' && method === "POST")) return [3 /*break*/, 3];
                    content_1 = '';
                    request.on('data', function (chunk) {
                        content_1 += chunk.toString();
                    });
                    request.on('end', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var patientForm, patientName, patientSpecies, patientAge, patientSickness, patientDateAdmit, error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        patientForm = querystring.parse(content_1);
                                        patientName = patientForm.name;
                                        patientSpecies = patientForm.species;
                                        patientAge = patientForm.age;
                                        patientSickness = patientForm.sickness;
                                        patientDateAdmit = new Date();
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 4, , 5]);
                                        if (!(patientName !== undefined && patientSpecies !== undefined &&
                                            patientSickness !== undefined && !Number.isNaN(patientAge))) return [3 /*break*/, 3];
                                        return [4 /*yield*/, (0, showPatients_1.insertValues)({
                                                name: String(patientName),
                                                species: String(patientSpecies),
                                                age: Number(patientAge),
                                                sickness: String(patientSickness),
                                                date_created: patientDateAdmit,
                                                date_updated: new Date()
                                            })];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [3 /*break*/, 5];
                                    case 4:
                                        error_1 = _a.sent();
                                        console.log(error_1);
                                        return [3 /*break*/, 5];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        });
                    });
                    _a = "\n    <!DOCTYPE html>\n    <html lang=\"en\">\n\n    <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <title>List of Patients</title>\n    </head>\n    <body>\n    <form action = \"/update-patients\" method = \"POST\">\n    Please refresh the page if there are no patients listed.<br>\n   The current patients are as listed:<br>\n   ".concat;
                    return [4 /*yield*/, (0, showPatients_1.showValues)()];
                case 2:
                    html = _a.apply("\n    <!DOCTYPE html>\n    <html lang=\"en\">\n\n    <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <title>List of Patients</title>\n    </head>\n    <body>\n    <form action = \"/update-patients\" method = \"POST\">\n    Please refresh the page if there are no patients listed.<br>\n   The current patients are as listed:<br>\n   ", [_b.sent(), " <br>\n    <button>Click here to update a patient</button>\n    </form>\n    </body>\n    </html>"]);
                    response.writeHead(200, { 'Content-Type': 'text/html' }).end(html);
                    return [3 /*break*/, 4];
                case 3:
                    if (url === '/update-patients' && method === "POST") {
                        html = "\n      <!DOCTYPE html>\n      <html lang=\"en\">\n      \n      <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <title>Patient Verification</title>\n      </head>\n      <body>\n      <form action = \"/update-status\" method = \"POST\">\n      Enter the ID of the patient, and the patient's status:<br>\n      Patient ID: <input type = \"number\" name=\"id\"><br>\n      Patient Status/Sickness: <input type = \"text\" name=\"status\"><br>\n      <button>Click to proceed</button>\n        </form>\n      </body>\n      </html>\n    ";
                        response.writeHead(200, { 'Content-Type': 'text/html' }).end(html);
                    }
                    else if (url === '/update-status' && method === "POST") {
                        content_2 = '';
                        request.on('data', function (chunk) {
                            content_2 += chunk.toString();
                        });
                        request.on('end', function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var html, input, petID, updatedStatus, inputUser;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            html = '';
                                            input = querystring.parse(content_2);
                                            petID = parseInt(input.id);
                                            updatedStatus = String(input.status);
                                            return [4 /*yield*/, (0, showPatients_1.getTokenInput)(petID)];
                                        case 1:
                                            inputUser = _a.sent();
                                            return [4 /*yield*/, (0, showPatients_1.updateDatabaseValues)(updatedStatus, petID)];
                                        case 2:
                                            _a.sent();
                                            try {
                                                if (inputUser) {
                                                    html = /* html */
                                                        "  <!DOCTYPE html>\n        <html lang=\"en\"> \n        <head>\n          <meta charset=\"UTF-8\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n          <title>Document</title>\n        </head>\n        <body>\n        <form action = \"/patients\" method = \"POST\">\n        The patient's status has been updated successfully!\n         <button>Click to return to list of patients.</button>\n         </form>\n        </body>\n        </html>";
                                                }
                                                else {
                                                    html = /* html */
                                                        "  <!DOCTYPE html>\n      <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <title>Document</title>\n      </head>\n      <body>\n     Invalid id detected.\n      </body>\n      </html>";
                                                }
                                            }
                                            catch (error) {
                                                console.log(error);
                                            }
                                            response.writeHead(200, { 'Content-Type': 'text/html' }).end(html);
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        });
                    }
                    _b.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
var server = http.createServer(handleRequest);
server.listen(3000, function () {
    console.log('Server started at http://localhost:3000/vet-clinic');
});

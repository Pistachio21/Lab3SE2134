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
exports.updateDatabaseValues = exports.getTokenInput = exports.showValues = exports.insertValues = exports.databaseData = void 0;
var pg_1 = require("pg");
exports.databaseData = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Lab 3',
    password: 'shawn',
    port: 5433
});
function insertValues(patient) {
    return __awaiter(this, void 0, void 0, function () {
        var connectDatabase, pushData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, exports.databaseData.connect()];
                case 1:
                    connectDatabase = _a.sent();
                    return [4 /*yield*/, connectDatabase.query("\n    INSERT INTO vet_clinic(pet_name,species,age,sickness,created_at,updated_at) \n    VALUES($1, $2, $3, $4, $5, $6)", [patient.name, patient.species, patient.age, patient.sickness,
                            patient.date_created, patient.date_updated])];
                case 2:
                    pushData = _a.sent();
                    return [2 /*return*/, pushData];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.insertValues = insertValues;
function showValues() {
    return __awaiter(this, void 0, void 0, function () {
        var getDatabaseValues, getPatientInfo, patientData, patientInfo, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.databaseData.connect()];
                case 1:
                    getDatabaseValues = _a.sent();
                    return [4 /*yield*/, getDatabaseValues.query('SELECT * FROM vet_clinic')];
                case 2:
                    getPatientInfo = _a.sent();
                    patientData = getPatientInfo.rows;
                    patientInfo = '';
                    for (i = 0; i < patientData.length; i++) {
                        patientInfo +=
                            "\n        Pet ID: ".concat(patientData[i].pet_id, "<br>\n       Name: ").concat(patientData[i].pet_name, "<br>\n        Species: ").concat(patientData[i].species, "<br>\n        Age: ").concat(patientData[i].age, "<br>\n       Status: ").concat(patientData[i].sickness, "<br>\n        Date admitted: ").concat(patientData[i].created_at, "<br>\n        Last update: ").concat(patientData[i].updated_at, "<br><br><br>");
                    }
                    return [2 /*return*/, patientInfo];
            }
        });
    });
}
exports.showValues = showValues;
function getTokenInput(id) {
    return __awaiter(this, void 0, void 0, function () {
        var openDatabase, compareTokenInput, compareToDatabase, showPatientName, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.databaseData.connect()];
                case 1:
                    openDatabase = _a.sent();
                    return [4 /*yield*/, openDatabase.query("\n  SELECT pet_name FROM vet_clinic\n  WHERE pet_id = '".concat(id, "'"))];
                case 2:
                    compareTokenInput = _a.sent();
                    compareToDatabase = compareTokenInput.rows;
                    showPatientName = '';
                    for (i = 0; i < compareToDatabase.length; i++) {
                        showPatientName += compareToDatabase[i].pet_name;
                    }
                    return [2 /*return*/, showPatientName];
            }
        });
    });
}
exports.getTokenInput = getTokenInput;
function updateDatabaseValues(status, id) {
    return __awaiter(this, void 0, void 0, function () {
        var accessDatabase, updatePatient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.databaseData.connect()];
                case 1:
                    accessDatabase = _a.sent();
                    return [4 /*yield*/, accessDatabase.query("\n  UPDATE vet_clinic SET sickness = '".concat(status, "' WHERE pet_id = ").concat(id, " "))];
                case 2:
                    updatePatient = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateDatabaseValues = updateDatabaseValues;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createdoctor = void 0;
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
// export const createdoctor= async (req: Request, res: Response) => {
//     try {
//       const { username,name,email,password,dateofbirth,hourlyrate,affiliation, educationalBackground } = req.body;
//       const doctor = await doctorModel.create({ username,name,email,password,dateofbirth,hourlyrate,affiliation, educationalBackground});
//       res.status(200).json(doctor);
//     } catch (error) {
//       const err = error as Error;
//       res.status(400).json({ error: err.message });
//     }
//   };
const createdoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, name, email, password, dateOfBirth, hourlyRate, affiliation, speciality, educationalBackground } = req.body;
        const newDoctor = new doctorModel_1.default({
            username,
            name,
            email,
            password,
            dateOfBirth,
            hourlyRate,
            affiliation,
            speciality,
            educationalBackground,
        });
        const doctor = yield newDoctor.save();
        res.status(200).json(doctor);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
});
exports.createdoctor = createdoctor;

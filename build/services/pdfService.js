"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPdf = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const buffer_1 = require("buffer");
const genPdf = (data) => {
    const urlToImg = (url) => new Promise((resolve, reject) => {
        https_1.default.get(url, (res) => {
            const image = [];
            res.on('data', (img) => img.push(img));
            res.on('end', () => resolve(buffer_1.Buffer.concat(image)));
            res.on('error', reject);
        }).on('error', reject);
    });
    const dateFormat = (date) => {
        const dat = new Date(date);
        if (isNaN(dat.getTime()))
            return String(date);
        return dat.toLocaleDateString('en-us', { month: '2-digit', day: '2-digit', year: 'numeric' });
    };
    return new Promise(async (resolve, reject) => {
        try {
            const doc = new pdfkit_1.default({ margin: 30, size: [800, 1500] });
            const buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                resolve(buffer_1.Buffer.concat(buffers));
            });
            doc.image(path_1.default.join(__dirname, '../assets/rcrlogo.png'), 30, 30, { width: 120 });
            doc.fontSize(24).text('\nWHITEWATER RAFTING WAIVER', { align: 'center', underline: true });
            doc.moveDown();
            doc.fontSize(15).text(`  The undersigned, ${data.name}, understands that has made arrangements for a White Water River Rafting or River Floating ` +
                'excursion provided by Rincon Corobici S.A. in Costa Rica. I am fully aware that white water rafting has inherent ' +
                'dangers including the risk that participants may fall out of the raft and become injured. While these occurrences are rare, ' +
                'the client should investigate for him or herself of the possible dangers and risks involved in his/her participation in the ' +
                'tour, which does not imply or authorize a refund. The undersigned hereby knowingly and voluntarily waives any and all ' +
                'claims, causes of action or demands of any kind against, Rincón Corobici S.A. and any of their associated companies, ' +
                'their employees and officers for any injury, illness or material loss that may arise from my voluntary participation in this ' +
                'trip. The undersigned knowingly and voluntarily assumes the risks of the White Water River Rafting or River Floating, ' +
                'tour in the environs of Corobici river rapids, Tenorio River, Zapote River, Aguas Claras river or any other White Water ' +
                'Rafting or River Floating not mentioned here, visited during the tour for any claims made on his or her behalf against ' +
                'Rincon Corobici, or any of its associated companies.', { align: 'justify' });
            doc.moveDown(1);
            doc.fontSize(15).text('   Therefore, the undersigned releases, discharges and agrees to save harmless Rincon Corobici S.A., and any of their ' +
                'associated companies, their representatives, assigns, employees, or any other person, corporation or corporations for ' +
                'whom, they might be acting regardless of how any claim might arise. The undersigned agrees to abide by all government ' +
                'rules, regulations and restrictions during this trip.', { align: 'justify' });
            doc.moveDown(1);
            doc.fontSize(15).text('   The hired tour or activity, as well as this release of liability shall be governed exclusively by the law of Costa Rica. ' +
                'If even in spite of this contract, I proceed to file a lawsuit against Rincon Corobici S.A., and any of their associatedcompanies, ' +
                'their representatives, assigns, employees, or any other person, I agree to do solely in Costa Rica, under its ' +
                'jurisdiction, for which I expressly and voluntarily waive the laws and jurisdiction of any other country.' +
                '\nI HAVE READ THE FOREGOING WAIVER AND RELEASE, BEFORE AFFIXING MY SIGNATURE BELOW, AND' +
                'WARRANT THAT I AM OF LEGAL AGE AND FULLY UNDERSTAND THE CONTENTS AND CONSEQUENCES' +
                'THEREOF, INCLUDING THAT I AM WAIVING MY RIGHTS TO BRING SUIT IF I BECOME INJURED.', { align: 'justify' });
            doc.moveDown(2);
            doc.fontSize(15).text(`Full name of the participant: ${data.name}          Date of the tour: ${dateFormat(data.tour_date)}`);
            doc.fontSize(15).text(`Parental or legal guardian: ${data.legal_guardian}`);
            doc.fontSize(15).text('\nWarning: Rincon Corobici S.A. is not responsible for eye-wear, hearing aids, contact lenses, cameras, dentures, or other valuables.');
            doc.moveDown(3);
            doc.fontSize(20).text('MEDICAL HISTORY', { align: 'center', underline: true });
            doc.fontSize(20).text('ELEGIBILITY FOR WHITE WATER RAFTING TRIP', { align: 'center', underline: true });
            doc.moveDown();
            doc.fontSize(15).text('Passenger - please complete this section and sign your name below');
            doc.fontSize(15).text('Check past or present if statement applies to you');
            doc.moveDown(1);
            const conditions = [
                { label: "Alcoholism", value: data.alcoholism },
                { label: "Claustrophobia", value: data.claustrophobia },
                { label: "Dizziness", value: data.dizzines },
                { label: "Ear Infection", value: data.ear_infection },
                { label: "Epilepsy", value: data.epilepsy },
                { label: "Peptic Ulcers", value: data.peptic_ulcers },
                { label: "Respiratory Problems", value: data.respiratory_problems },
                { label: "Neck Injure", value: data.neck_injure },
                { label: "Back Problems", value: data.back_problems },
                { label: "Drug Use", value: data.drug_use },
                { label: "Depression", value: data.depression },
                { label: "Heart Problems", value: data.heart_problems },
                { label: "Recent Operation", value: data.recent_operation },
                { label: "Headaches", value: data.headaches },
                { label: "Overweight", value: data.overweight }
            ];
            const colWidth = 200;
            const gap = 40;
            const totalWidth = colWidth * 2 + gap;
            const xCor = (doc.page.width - totalWidth) / 2;
            let yCor = doc.y;
            conditions.forEach((cond, index) => {
                const col = index % 2;
                const x = xCor + col * (colWidth + gap);
                doc.fontSize(15).text(`${cond.label}: ${cond.value ? 'YES' : 'NO'}`, x, yCor, { width: 370, align: 'left' });
                if (col === 1) {
                    yCor += 20;
                }
            });
            doc.x = doc.page.margins.left;
            doc.moveDown(2);
            doc.fontSize(15).text(`Are you pregnant? How many months?: ${data.pregnancy}.`);
            doc.moveDown(1);
            doc.fontSize(15).text(`List all medications you are currently using: ${dateFormat(data.medications)}.`);
            doc.fontSize(15).text(`Date of last medications you are currently using: ${dateFormat(data.date_medications)}.`);
            doc.moveDown(1);
            doc.fontSize(15).text(`Date of last medical examination: ${dateFormat(data.date_examination)}.`);
            doc.fontSize(15).text(`Date of last chest X-Ray: ${dateFormat(data.date_xray)}.`);
            doc.moveDown(1);
            doc.moveDown(1);
            doc.fontSize(15).text(`List any other areas you feel may affect your participation in the program: ${data.other_areas}.`);
            doc.moveDown(1);
            doc.fontSize(15).text(`I, ${data.name}, here by certify that the above is correct to the best of my knoledge.`);
            doc.moveDown(1);
            if (data.signature_url) {
                try {
                    const sign = await urlToImg(data.signature_url);
                    doc.image(sign, { width: 300 });
                }
                catch (err) {
                    doc.text('Unable to load signature');
                }
            }
            else {
                doc.text('Unable to load signature');
            }
            doc.end();
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.genPdf = genPdf;

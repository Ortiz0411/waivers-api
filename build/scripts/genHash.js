"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const password = process.argv[2];
if (!password) {
    console.error('Uso: ts-node scripts/make-hash.ts <password>');
    process.exit(1);
}
bcrypt_1.default.hash(password, 12).then(h => {
    console.log(h);
});

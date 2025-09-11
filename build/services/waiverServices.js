"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWaiver = exports.getWaiverById = exports.getWaivers = void 0;
const getWaivers = async (pool) => {
    const result = await pool.query('SELECT * FROM waivers ORDER BY id DESC');
    return result.rows;
};
exports.getWaivers = getWaivers;
const getWaiverById = () => {
};
exports.getWaiverById = getWaiverById;
const addWaiver = () => {
};
exports.addWaiver = addWaiver;

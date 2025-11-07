"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const url = process.env.SUPABASE_URL;
const serviceRole = process.env.SUPABASE_ROLE;
exports.supabase = (0, supabase_js_1.createClient)(url, serviceRole, {
    auth: { persistSession: false }
});

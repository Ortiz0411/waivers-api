/** 
 * Inicializa cliente de Supabase
 * - Usa URL y service role key
 */

import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL!
const serviceRole = process.env.SUPABASE_ROLE!

export const supabase = createClient(url, serviceRole, {
    auth: {persistSession: false}
})
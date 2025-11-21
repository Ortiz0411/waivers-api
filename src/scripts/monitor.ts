/**
 * Monitorea el uso de Vercel.
 * Devuelve lista de alertas al superar el 75%
 */
export async function monitor() {

    try {

        // Obtiene uso de Vercel
        const url = `https://api.vercel.com/v1/usage`

        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${process.env.VERCEL_TOKEN!}`
            }
        })

        // Convierte a JSON
        const data: any = await res.json()

        const alerts = []

        // Analiza cada recurso devuelto por Vercel
        for (const item of data.usage) {
            const used = item.used
            const limit = item.limit

            // Omite resultado en 0 o negativos
            if (!limit || limit <= 0) continue

            const total = used / limit

            // Si supera el 75% se agrega a las alertas
            if (total >= 0.75) {
                alerts.push({
                    resource: item.resource,
                    used,
                    limit,
                    percent: total
                })
            }
        }

        // Devuelve si hay alertas
        return alerts.length > 0 ? alerts : null

    } catch (err) {
        return null
    }

}
/**
 * Monitor the use of Vercel.
 * Returns list of alerts when exceeding 75%
 */

/*
export async function monitor() {

    try {

        // Vercel usage
        const url = process.env.VERCEL_MONITOR_URL!

        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${process.env.VERCEL_TOKEN!}`
            }
        })

        // Convert to JSON
        const data: any = await res.json()

        const alerts = []

        // Analyze resources returned by Vercel
        for (const item of data.usage) {
            const used = item.used
            const limit = item.limit

            // Omit results of 0 or negative
            if (!limit || limit <= 0) continue

            const total = used / limit

            // If it exceeds 75%, it is added to the alerts.
            if (total >= 0.75) {
                alerts.push({
                    resource: item.resource,
                    used,
                    limit,
                    percent: total
                })
            }
        }

        // Returns if there are alerts
        return alerts.length > 0 ? alerts : null

    } catch (err) {
        return null
    }

}*/
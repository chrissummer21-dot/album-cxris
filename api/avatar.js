export default async function handler(req, res) {
    const { userIds } = req.query;

    if (!userIds) {
        return res.status(400).json({ error: 'Missing userIds parameter' });
    }

    try {
        const robloxUrl = `https://thumbnails.roblox.com/v1/users/avatar-bust?userIds=${userIds}&size=420x420&format=Png&isCircular=false`;
        
        const response = await fetch(robloxUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 Vercel-Proxy'
            }
        });
        
        const data = await response.json();
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        
        if (!response.ok) {
            return res.status(response.status).json(data || { error: `Roblox API responded with ${response.status}` });
        }

        return res.status(200).json(data);
    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(500).json({ error: error.message });
    }
}

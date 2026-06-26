export default async function handler(req, res) {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'Missing username parameter' });
    }

    try {
        const robloxUrl = `https://users.roblox.com/v1/usernames/users`;
        
        const response = await fetch(robloxUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 Vercel-Proxy'
            },
            body: JSON.stringify({
                usernames: [username],
                excludeBannedUsers: false
            })
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

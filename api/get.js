export default async function handler(req, res) {
  const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
  const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await fetch(
      `${UPSTASH_REDIS_REST_URL}/get/gift-exchange-data`,
      {
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    
    if (data.result) {
      return res.status(200).json(JSON.parse(data.result));
    } else {
      return res.status(200).json({ alreadySelected: [], alreadyPicked: [] });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to get data' });
  }
}
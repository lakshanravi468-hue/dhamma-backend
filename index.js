// index.js - Backend Master Code
export default async function handler(req, res) {
  // CORS Permissions
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { question } = req.body;
    const GEMINI_API_KEY = "AIzaSyBrsVJateBIgnXkKa4im1hiHE1y2X0eWSs";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: question }] }] })
      }
    );

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      const reply = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ reply: reply });
    } else {
      return res.status(200).json({ reply: "පින්වත, මොහොතක් රැඳී සිට නැවත විමසන්න." });
    }
  } catch (error) {
    return res.status(200).json({ reply: "බාධාවක් පවතී. කරුණාකර නැවත උත්සාහ කරන්න." });
  }
}

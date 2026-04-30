export default async function handler(req, res) {
  try {
    const prompt = req.body?.prompt;

    console.log("PROMPT:", prompt);

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ result: "API KEY tidak terbaca" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Kamu AI ramalan lucu viral TikTok" },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    console.log("OPENAI RESPONSE:", data);

    return res.status(200).json({
      result: data?.choices?.[0]?.message?.content || JSON.stringify(data)
    });

  } catch (err) {
    return res.status(500).json({
      result: "ERROR: " + err.message
    });
  }
}
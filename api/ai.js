export default async function handler(req, res) {
  try {
    const { prompt } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ result: "Prompt kosong" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Kamu AI ramalan viral TikTok lucu" },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      result: data.choices?.[0]?.message?.content || "Tidak ada jawaban"
    });

  } catch (err) {
    res.status(500).json({
      result: "ERROR: " + err.message
    });
  }
}
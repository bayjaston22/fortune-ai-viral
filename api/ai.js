export default async function handler(req,res){
  const {prompt} = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
    },
    body:JSON.stringify({
      model:"gpt-4o-mini",
      messages:[
        {role:"system",content:"Kamu AI ramalan lucu, viral, seperti konten TikTok"},
        {role:"user",content:prompt}
      ]
    })
  });

  const data = await response.json();

  res.json({
    result: data.choices?.[0]?.message?.content || "error"
  });
}
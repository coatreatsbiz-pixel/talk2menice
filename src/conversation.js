// /api/conversation.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userInput, palName, language } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a friendly, uplifting AI conversation pal named ${palName}. 
          Respond in ${language}. 
          Hard boundaries: do NOT discuss self-harm, violence, adult content, or offensive language. 
          Keep conversation soft, positive, and encouraging.`
        },
        { role: "user", content: userInput }
      ],
      temperature: 0.7
    });

    const palResponse = response.choices[0].message.content;
    res.status(200).json({ palResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Pal is resting, try again shortly." });
  }
}
const handleSend = async (inputText) => {
  const res = await fetch("/api/conversation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userInput: inputText,
      palName: selectedPalNickname,
      language: selectedLanguage
    })
  });
  const data = await res.json();
  setChat([...chat, { from: "Pal", message: data.palResponse }]);
  speakText(data.palResponse); // Step 5.3 handles voice
};

function speakText(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);

    // Use user-selected Pal voice if available
    utterance.voice = speechSynthesis.getVoices().find(v => v.name === selectedVoiceName);

    // Apply user volume & speed settings
    utterance.volume = volumeLevel; // 0.0 → 1.0
    utterance.rate = speedLevel;    // 0.5 → 2.0

    speechSynthesis.speak(utterance);
  } else {
    console.warn("TTS not supported in this browser");
  }
}

const handleSend = async (inputText) => {
  const res = await fetch("/api/conversation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userInput: inputText,
      palName: selectedPalNickname,
      language: selectedLanguage
    })
  });
  const data = await res.json();
  setChat([...chat, { from: "Pal", message: data.palResponse }]);

  // Speak the Pal’s response
  speakText(data.palResponse);
};

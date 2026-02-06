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

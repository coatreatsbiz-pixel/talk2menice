import { useState } from "react";

export default function DictionaryLookup() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");

  const handleLookup = async () => {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();
    setDefinition(data[0]?.meanings[0]?.definitions[0]?.definition || "Not found");
  };

  return (
    <div className="dictionary-lookup">
      <input
        type="text"
        placeholder="Type a word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button onClick={handleLookup}>Look Up</button>
      {definition && <p>{definition}</p>}
    </div>
  );
}

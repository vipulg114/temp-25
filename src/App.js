import React, { useState } from "react";
import ChatWidget from "./ChatWidget";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        style={{
          position: "fixed", bottom: 20, right: 20, borderRadius: 50,
          width: 60, height: 60, background: "#007bff", color: "#fff",
          border: "none", cursor: "pointer", fontSize: 24
        }}
        onClick={() => setOpen(o => !o)}
      >💬</button>
      {open && <ChatWidget onClose={() => setOpen(false)} />}
    </>
  );
}

export default App;

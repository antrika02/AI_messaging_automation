import { useState } from "react";
import Header from "./components/Header";
import MessageForm from "./components/MessageForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-6xl mx-auto py-10 px-5 space-y-8">
        <Dashboard messages={messages} />

        <MessageForm
          messages={messages}
          setMessages={setMessages}
        />
      </main>
    </div>
  );
}

export default App;
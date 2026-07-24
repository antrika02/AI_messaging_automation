import Header from "./components/Header";
import MessageForm from "./components/MessageForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-5xl mx-auto py-10 px-5">
        <MessageForm />
      </main>
    </div>
  );
}

export default App;
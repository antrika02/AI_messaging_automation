function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-5">
        <h1 className="text-3xl font-bold">
          🏨 AI Guest Messaging Dashboard
        </h1>

        <p className="text-blue-100 mt-2">
          FastAPI • Claude AI • PostgreSQL
        </p>
      </div>
    </header>
  );
}

export default Header;
import { useState } from "react";

function MessageForm() {
  const [source, setSource] = useState("airbnb");
  const [guestName, setGuestName] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

   console.log("========== FORM DATA ==========");

console.log("Source:", source);

console.log("Guest Name:", guestName);

console.log("Booking Ref:", bookingRef);

console.log("Property ID:", propertyId);

console.log("Message:", message);

console.log("===============================");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">
        Process Guest Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Source */}
        <div>
          <label className="block mb-2 font-medium">
            Source
          </label>

          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="airbnb">Airbnb</option>
            <option value="booking">Booking.com</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>

        {/* Guest Name */}
        <div>
          <label className="block mb-2 font-medium">
            Guest Name
          </label>

          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Rahul Sharma"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Booking Ref */}
        <div>
          <label className="block mb-2 font-medium">
            Booking Reference
          </label>

          <input
            type="text"
            value={bookingRef}
            onChange={(e) => setBookingRef(e.target.value)}
            placeholder="NIS-2026-1001"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Property */}
        <div>
          <label className="block mb-2 font-medium">
            Property ID
          </label>

          <input
            type="text"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            placeholder="villa-b1"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-2 font-medium">
            Guest Message
          </label>

          <textarea
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type the guest message..."
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Process Message
        </button>

      </form>
    </div>
  );
}

export default MessageForm;
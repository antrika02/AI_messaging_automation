import { useState } from "react";
import api from "../services/api";

function MessageForm() {
  const [source, setSource] = useState("airbnb");
  const [guestName, setGuestName] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      source,
      guest_name: guestName,
      booking_ref: bookingRef,
      property_id: propertyId,
      message,
      timestamp: new Date().toISOString(),
    };

    try {
      console.log("Submitting payload...");
      console.log(payload);

      const response = await api.post("/webhook/message", payload);

      console.log("Backend Response:");
      console.log(response.data);

      setResult(response.data.data);
    } catch (error) {
      console.error("API Error:", error);
    }
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
            <option value="booking_com">Booking.com</option>
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

        {/* Booking Reference */}
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

        {/* Property ID */}
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

        {/* Guest Message */}
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

      {/* AI Result */}
      {result && (
        <div className="mt-8 rounded-xl border bg-gray-50 p-6 shadow">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            AI Response
          </h3>

          <div className="space-y-4">
            <div>
              <span className="font-semibold">
                Query Type:
              </span>

              <p className="text-blue-600 capitalize">
                {result.query_type}
              </p>
            </div>

            <div>
              <span className="font-semibold">
                Confidence Score:
              </span>

              <p>{result.confidence_score}</p>
            </div>

            <div>
              <span className="font-semibold">
                Recommended Action:
              </span>

              <p className="font-bold">
                {result.action}
              </p>
            </div>

            <div>
              <span className="font-semibold">
                AI Draft Reply:
              </span>

              <div className="mt-2 rounded-lg border bg-white p-4 whitespace-pre-wrap">
                {result.drafted_reply}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageForm;
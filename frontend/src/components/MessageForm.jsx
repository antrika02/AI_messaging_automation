import { useState } from "react";
import api from "../services/api";
import {
  Copy,
  CheckCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

function MessageForm({ messages, setMessages }) {
  const [source, setSource] = useState("airbnb");
  const [guestName, setGuestName] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [message, setMessage] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    const payload = {
      source,
      guest_name: guestName,
      booking_ref: bookingRef,
      property_id: propertyId,
      message,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await api.post("/webhook/message", payload);
      const data = response.data.data;

      setResult(data);

      setMessages([
        {
          guestName,
          queryType: data.query_type,
          confidence: data.confidence_score,
          action: data.action,
        },
        ...messages,
      ]);
  } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyReply = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(result.drafted_reply);

    setCopied(true);
    setShowToast(true);

    setTimeout(() => {
      setCopied(false);
      setShowToast(false);
    }, 2000);
  };

  const getConfidenceColor = (score) => {
    if (score >= 0.9) {
      return "bg-green-100 text-green-700";
    }

    if (score >= 0.6) {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  };

  const getActionColor = (action) => {
    switch (action) {
      case "auto_send":
        return "bg-green-100 text-green-700";

      case "agent_review":
        return "bg-yellow-100 text-yellow-700";

      case "escalate":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getQueryColor = () => {
    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10">

      {/* Header */}

      <div className="flex items-center gap-4 mb-10">

        <div className="rounded-full bg-blue-100 p-4">
          <Sparkles className="h-8 w-8 text-blue-600" />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Guest Messaging Assistant
          </h2>

          <p className="text-gray-500 mt-1">
            AI-powered guest support for Airbnb, Booking.com & WhatsApp
          </p>
        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Source */}

        <div>
          <label className="mb-2 block font-medium">
            Source
          </label>

          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          >
            <option value="airbnb">Airbnb</option>
            <option value="booking_com">
              Booking.com
            </option>
            <option value="whatsapp">
              WhatsApp
            </option>
          </select>
        </div>

        {/* Guest Name */}

        <div>
          <label className="mb-2 block font-medium">
            Guest Name
          </label>

          <input
            type="text"
            value={guestName}
            onChange={(e) =>
              setGuestName(e.target.value)
            }
            placeholder="Rahul Sharma"
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          />
        </div>

        {/* Booking Ref */}

        <div>
          <label className="mb-2 block font-medium">
            Booking Reference
          </label>

          <input
            type="text"
            value={bookingRef}
            onChange={(e) =>
              setBookingRef(e.target.value)
            }
            placeholder="NIS-2026-1001"
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          />
        </div>

        {/* Property */}

        <div>
          <label className="mb-2 block font-medium">
            Property ID
          </label>

          <input
            type="text"
            value={propertyId}
            onChange={(e) =>
              setPropertyId(e.target.value)
            }
            placeholder="villa-b1"
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          />
        </div>

        {/* Message */}

        <div>
          <label className="mb-2 block font-medium">
            Guest Message
          </label>

          <textarea
            rows="6"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Type the guest message..."
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
          />

        </div>

        {/* Submit Button */}

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-xl py-3 text-white font-semibold flex items-center justify-center gap-2 transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Process Message
            </>
          )}
        </button>

      </form>

      {error && (
        <div className="mt-6 rounded-xl bg-red-100 text-red-700 p-4">
          {error}
        </div>
      )}

            {/* AI Result */}

      {result && (
        <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-lg">

          <div className="mb-6 flex items-center gap-3">
            <CheckCircle className="h-7 w-7 text-green-600" />

            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                AI Response
              </h3>

              <p className="text-sm text-gray-500">
                Generated by the AI assistant
              </p>
            </div>
          </div>

          {/* Badges */}

          <div className="mb-8 flex flex-wrap gap-3">

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${getQueryColor()}`}
            >
              {result.query_type.replaceAll("_", " ")}
            </span>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${getConfidenceColor(
                result.confidence_score
              )}`}
            >
              {Math.round(result.confidence_score * 100)}% Confidence
            </span>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${getActionColor(
                result.action
              )}`}
            >
              {result.action.replaceAll("_", " ")}
            </span>

          </div>

          {/* AI Reply */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Draft Reply
            </div>

            <div className="whitespace-pre-wrap leading-8 text-gray-700">
              {result.drafted_reply}
            </div>

            <div className="mt-8">

              <button
                onClick={copyReply}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow transition hover:bg-blue-700"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" />
                    Copy Reply
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Toast */}

      {showToast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 rounded-xl bg-green-600 px-6 py-4 text-white shadow-2xl">

          <CheckCircle className="h-5 w-5" />

          <span className="font-medium">
            Reply copied to clipboard!
          </span>

        </div>
      )}

    </div>
  );
}

export default MessageForm;
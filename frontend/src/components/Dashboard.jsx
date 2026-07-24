const getConfidenceBadge = (score) => {
  if (score >= 0.9) {
    return "bg-green-100 text-green-700";
  }

  if (score >= 0.6) {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-red-100 text-red-700";
};

const getActionBadge = (action) => {
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

function Dashboard({ messages }) {
  return (
    <div className="rounded-2xl bg-white shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-8">
        Guest Messaging Dashboard
      </h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {/* Today's Messages */}
        <div className="rounded-xl bg-blue-50 p-5 shadow transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Today's Messages
            </p>

            <span className="text-2xl">💬</span>
          </div>

          <p className="mt-3 text-3xl font-bold">
            {messages.length}
          </p>
        </div>

        {/* Average Confidence */}
        <div className="rounded-xl bg-green-50 p-5 shadow transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Average Confidence
            </p>

            <span className="text-2xl">🎯</span>
          </div>

          <p className="mt-3 text-3xl font-bold">
            {messages.length
              ? Math.round(
                  (messages.reduce(
                    (sum, m) => sum + m.confidence,
                    0
                  ) /
                    messages.length) *
                    100
                )
              : 0}
            %
          </p>
        </div>

        {/* Escalations */}
        <div className="rounded-xl bg-red-50 p-5 shadow transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Escalations
            </p>

            <span className="text-2xl">🚨</span>
          </div>

          <p className="mt-3 text-3xl font-bold">
            {
              messages.filter(
                (m) => m.action === "escalate"
              ).length
            }
          </p>
        </div>

        {/* Auto Sends */}
        <div className="rounded-xl bg-emerald-50 p-5 shadow transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Auto Sends
            </p>

            <span className="text-2xl">✅</span>
          </div>

          <p className="mt-3 text-3xl font-bold">
            {
              messages.filter(
                (m) => m.action === "auto_send"
              ).length
            }
          </p>
        </div>

      </div>

      {/* Recent Messages */}
      <div className="mt-10">

        <h3 className="mb-5 text-2xl font-bold">
          Recent Messages
        </h3>

        <div className="overflow-x-auto rounded-xl border border-gray-200">

          <table className="min-w-full bg-white">

            <thead className="sticky top-0 bg-gray-100">

              <tr>

                <th className="px-5 py-4 text-left font-semibold">
                  Guest
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Query
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Confidence
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {messages.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="py-10"
                  >
                    <div className="text-center">

                      <div className="mb-3 text-5xl">
                        🤖
                      </div>

                      <p className="text-gray-500">
                        No guest messages processed yet.
                      </p>

                    </div>
                  </td>

                </tr>

              ) : (

                messages.map((message, index) => (

                  <tr
                    key={index}
                    className="border-t transition duration-200 hover:bg-blue-50"
                  >

                    <td className="px-5 py-4 font-medium">
                      {message.guestName}
                    </td>

                    <td className="px-5 py-4 capitalize">
                      {message.queryType.replaceAll("_", " ")}
                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${getConfidenceBadge(
                          message.confidence
                        )}`}
                      >
                        {Math.round(
                          message.confidence * 100
                        )}
                        %
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${getActionBadge(
                          message.action
                        )}`}
                      >
                        {message.action.replaceAll(
                          "_",
                          " "
                        )}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
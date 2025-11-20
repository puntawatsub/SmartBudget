const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-white p-10 rounded-xl shadow-lg m-10 flex flex-col md:flex-row items-center">
        <div className="flex-1 text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Money Your Rules
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-blue-500 mb-4">
            SMART BUDGET
          </h2>
          <p className="text-gray-600 mb-6">
            With SmartBudget, managing your finances has never been easier.
            Start tracking, planning, and achieving your financial goals today.
          </p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            Get Started
          </button>
        </div>
        
      </section>

      {/* Why Choose Us Section */}
      <section className="text-center my-16">
        <h2 className="text-3xl font-semibold mb-10">Why choose us?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 px-4 md:px-0">
          {["Budget Tracking", "Budget Tracking", "Budget Tracking"].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 flex-1">
              <h3 className="text-xl font-bold mb-3">{item}</h3>
              <p className="text-gray-600 text-sm">
                With the Budget Tracking feature, you can create budgets for different spending categories, earn fast info, transportation, extraamount, and more. Track daily expenses and helps you stay within your set budget.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Revolutionise Section */}
      <section className="my-16 px-4 md:px-20">
        <h2 className="text-3xl font-semibold text-center mb-10">Revolutionise</h2>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Before Using SmartBudget */}
          <div className="flex-1 bg-purple-100 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4">Before Using SmartBudget</h3>
            <ul className="list-disc list-inside text-gray-700">
              {[
                "Manual, disorganized",
                "Offline, often inaccurate",
                "Manual notes, often forgotten",
                "Manual, time-consuming",
                "Time-consuming, complicated",
                "Difficult, unstructured",
                "Complicated, manual",
                "Requires high discipline",
                "Risk of losing data",
                "Time-consuming, complicated",
              ].map((item, idx) => (
                <li key={idx} className="mb-1">{item}</li>
              ))}
            </ul>
          </div>

          {/* After Using SmartBudget */}
          <div className="flex-1 bg-green-100 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4">After Using SmartBudget</h3>
            <ul className="list-disc list-inside text-gray-700">
              {[
                "Automated, organized",
                "Easy, customizable",
                "Real-time tracking with cash reports",
                "Graphs, easy to understand",
                "Intuitive, easy to use",
                "Structured, easy to track",
                "Secure",
                "Fast, efficient",
              ].map((item, idx) => (
                <li key={idx} className="mb-1">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


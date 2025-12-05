function AddGoalPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">Create New Goal</h1>

        <form className="space-y-4">

          <div>
            <label className="block font-medium mb-1">Goal Title</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="e.g., Buy a car"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Target Amount (€)</label>
            <input
              type="number"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="20000"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Current Saved (€)</label>
            <input
              type="number"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Deadline</label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Save Goal
          </button>

        </form>
        
      </div>

    </div>
  );
}

export default AddGoalPage;

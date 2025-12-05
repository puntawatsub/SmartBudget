import { useState, useEffect } from "react";

function GoalPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [deadline, setDeadline] = useState("");

  // Goals list
  const [goals, setGoals] = useState([]);

  // NEW — prevents overwriting localStorage on page load
  const [loaded, setLoaded] = useState(false);

  // PROGRESS CALCULATOR
  const calculateProgress = (saved, target) => {
    if (!target || target <= 0) return 0;
    return Math.min(100, Math.round((saved / target) * 100));
  };

  // LOAD FROM LOCAL STORAGE (runs once)
  useEffect(() => {
    const stored = localStorage.getItem("goals");
    if (stored) {
      try {
        setGoals(JSON.parse(stored));
      } catch (err) {
        console.error("Invalid JSON in localStorage");
      }
    }
    setLoaded(true); // IMPORTANT
  }, []);

  // SAVE TO LOCAL STORAGE (only after loaded)
  useEffect(() => {
    if (!loaded) return; // prevents deletion during initial load
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals, loaded]);

  // ADD NEW GOAL
  const handleAddGoal = (e) => {
    e.preventDefault();

    const newGoal = {
      id: Date.now(),
      title,
      target: Number(target),
      saved: Number(saved),
      deadline,
      progress: calculateProgress(Number(saved), Number(target)),
    };

    setGoals([...goals, newGoal]);

    setTitle("");
    setTarget("");
    setSaved("");
    setDeadline("");
    setShowForm(false);
  };

  // EDIT GOAL
  const startEditing = (goal) => {
    setEditingGoal({ ...goal });
    setShowForm(false);
  };

  const saveEdit = (e) => {
    e.preventDefault();

    const updatedGoal = {
      ...editingGoal,
      target: Number(editingGoal.target),
      saved: Number(editingGoal.saved),
      progress: calculateProgress(
        Number(editingGoal.saved),
        Number(editingGoal.target)
      ),
    };

    setGoals(goals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g)));
    setEditingGoal(null);
  };

  // DELETE GOAL
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this goal?");
    if (!confirmed) return;
    setGoals(goals.filter((g) => g.id !== id));

    if (editingGoal && editingGoal.id === id) {
      setEditingGoal(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">Goals</h1>

      {/* TOP BAR */}
      <div className="bg-white p-4 shadow-sm border rounded-xl flex justify-between items-center">
        <h2 className="text-xl font-semibold">Available Balance | Limit</h2>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          onClick={() => {
            setEditingGoal(null);
            setShowForm(!showForm);
          }}
        >
          Set New
        </button>
      </div>

      {/* ADD GOAL FORM */}
      {showForm && !editingGoal && (
        <div className="bg-white mt-4 p-6 rounded-xl shadow border">
          <h3 className="text-xl font-semibold mb-4">Add New Goal</h3>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleAddGoal}>
            <div>
              <label className="block font-medium mb-1">Goal Title</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Target Amount (€)</label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Current Saved (€)</label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2"
                value={saved}
                onChange={(e) => setSaved(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Deadline</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>

            {/* Progress Preview */}
            <div className="col-span-full">
              <p>Progress: {calculateProgress(saved, target)}%</p>
              <div className="w-full bg-gray-300 h-2 rounded mt-1">
                <div
                  className="bg-green-300 h-2 rounded"
                  style={{ width: `${calculateProgress(saved, target)}%` }}
                ></div>
              </div>
            </div>

            <div className="col-span-full mt-4 flex gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Save Goal
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg border"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT GOAL FORM */}
      {editingGoal && (
        <div className="bg-white mt-4 p-6 rounded-xl shadow border">
          <h3 className="text-xl font-semibold mb-4">Edit Goal</h3>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={saveEdit}>
            <div>
              <label className="block font-medium mb-1">Goal Title</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value={editingGoal.title}
                onChange={(e) =>
                  setEditingGoal({ ...editingGoal, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Target Amount (€)</label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2"
                value={editingGoal.target}
                onChange={(e) =>
                  setEditingGoal({ ...editingGoal, target: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Current Saved (€)</label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2"
                value={editingGoal.saved}
                onChange={(e) =>
                  setEditingGoal({ ...editingGoal, saved: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Deadline</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2"
                value={editingGoal.deadline}
                onChange={(e) =>
                  setEditingGoal({ ...editingGoal, deadline: e.target.value })
                }
                required
              />
            </div>

            <div className="col-span-full mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Save Changes
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg border ml-3"
                onClick={() => setEditingGoal(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* GOAL LIST */}
      <div className="bg-white mt-6 p-6 rounded-xl shadow border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-gray-100 p-5 rounded-xl border shadow-sm">
              <h3 className="text-lg font-semibold">{goal.title}</h3>

              {/* Edit + Delete buttons */}
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
                  onClick={() => startEditing(goal)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                  onClick={() => handleDelete(goal.id)}
                >
                  Delete
                </button>
              </div>

              <div className="w-full bg-gray-300 h-2 rounded mt-3">
                <div
                  className="bg-green-300 h-2 rounded"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>

              <div className="text-sm mt-3 space-y-1">
                <p><strong>€{goal.saved}</strong> saved</p>
                <p>Target: €{goal.target}</p>
                <p>Deadline: {goal.deadline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GoalPage;

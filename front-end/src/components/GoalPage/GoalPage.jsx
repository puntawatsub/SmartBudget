import { useState, useEffect } from "react";
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../../api/goalsApi";

function GoalPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [deadline, setDeadline] = useState("");
  const [monthlyTarget, setMonthlyTarget] = useState("");

  const [goals, setGoals] = useState([]);

  // PROGRESS CALCULATION
  const calculateProgress = (saved, target) => {
    if (!target || target <= 0) return 0;
    return Math.min(100, Math.round((saved / target) * 100));
  };

  // AUTO CALCULATE MONTHLY TARGET
  const calculateMonthlyTarget = (target, saved, deadline) => {
    if (!target || !deadline) return 0;
    const remainingAmount = target - saved;
    const now = new Date();
    const endDate = new Date(deadline);
    const monthsLeft =
      endDate.getMonth() -
      now.getMonth() +
      12 * (endDate.getFullYear() - now.getFullYear());
    if (monthsLeft <= 0) return remainingAmount; // due this month
    return Math.ceil(remainingAmount / monthsLeft);
  };

  useEffect(() => {
    setMonthlyTarget(
      calculateMonthlyTarget(Number(target), Number(saved), deadline)
    );
  }, [target, saved, deadline]);

  // LOAD GOALS FROM BACKEND
  useEffect(() => {
    async function load() {
      try {
        const data = await getGoals();
        setGoals(data);
      } catch (error) {
        console.error("Failed to load goals", error);
      }
    }
    load();
  }, []);

  // ADD NEW GOAL
  const handleAddGoal = async (e) => {
    e.preventDefault();

    const newGoal = {
      title,
      target: Number(target),
      saved: Number(saved),
      deadline,
      monthlyTarget,
    };

    const created = await createGoal(newGoal);
    setGoals([...goals, created]);

    // Clear form
    setTitle("");
    setTarget("");
    setSaved("");
    setDeadline("");
    setShowForm(false);
  };

  // START EDITING
  const startEditing = (goal) => {
    setEditingGoal({ ...goal });
    setShowForm(false);
  };

  // SAVE EDITED GOAL
  const saveEdit = async (e) => {
    e.preventDefault();

    const updatedGoal = {
      ...editingGoal,
      target: Number(editingGoal.target),
      saved: Number(editingGoal.saved),
      monthlyTarget: Number(editingGoal.monthlyTarget),
    };

    const result = await updateGoal(editingGoal._id, updatedGoal);
    setGoals(goals.map((g) => (g._id === result._id ? result : g)));
    setEditingGoal(null);
  };

  // DELETE GOAL
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this goal?"
    );

    if (!confirmed) return;

    await deleteGoal(id);
    setGoals(goals.filter((g) => g._id !== id));

    if (editingGoal && editingGoal._id === id) {
      setEditingGoal(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">Goals</h1>

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

      {showForm && !editingGoal && (
        <div className="bg-white mt-4 p-6 rounded-xl shadow border">
          <h3 className="text-xl font-semibold mb-4">Add New Goal</h3>

          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            onSubmit={handleAddGoal}
          >
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
              <label className="block font-medium mb-1">
                Target Amount (€)
              </label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Current Saved (€)
              </label>
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

            <div>
              <label className="block font-medium mb-1">
                Monthly Target Amount (€)
              </label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2"
                value={monthlyTarget}
                onChange={(e) => setMonthlyTarget(e.target.value)}
              />
            </div>

            <div className="col-span-full">
              <p>Progress: {calculateProgress(saved, target)}%</p>
              <div className="w-full bg-gray-300 h-2 rounded mt-1">
                <div
                  className="bg-green-300 h-2 rounded"
                  style={{
                    width: `${calculateProgress(saved, target)}%`,
                  }}
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

      {editingGoal && (
        <div className="bg-white mt-4 p-6 rounded-xl shadow border">
          <h3 className="text-xl font-semibold mb-4">Edit Goal</h3>

          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            onSubmit={saveEdit}
          >
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
              <label className="block font-medium mb-1">
                Target Amount (€)
              </label>
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
              <label className="block font-medium mb-1">
                Current Saved (€)
              </label>
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

            <div>
              <label className="block font-medium mb-1">
                Monthly Target Amount (€)
              </label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2"
                value={editingGoal.monthlyTarget}
                onChange={(e) =>
                  setEditingGoal({
                    ...editingGoal,
                    monthlyTarget: e.target.value,
                  })
                }
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

      <div className="bg-white mt-6 p-6 rounded-xl shadow border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <div
              key={goal._id}
              className="bg-gray-100 p-5 rounded-xl border shadow-sm"
            >
              <h3 className="text-lg font-semibold">{goal.title}</h3>

              <div className="flex gap-2 mt-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
                  onClick={() => startEditing(goal)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                  onClick={() => handleDelete(goal._id)}
                >
                  Delete
                </button>
              </div>

              <div className="w-full bg-gray-300 h-2 rounded mt-3">
                <div
                  className="bg-green-300 h-2 rounded"
                  style={{
                    width: `${calculateProgress(goal.saved, goal.target)}%`,
                  }}
                ></div>
              </div>

              <div className="text-sm mt-3 space-y-1">
                <p>
                  <strong>€{goal.saved}</strong> saved
                </p>
                <p>Target: €{goal.target}</p>
                <p>
                  Deadline:{" "}
                  {new Date(goal.deadline).toISOString().split("T")[0]}
                </p>
                <p>Monthly Target: €{goal.monthlyTarget}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GoalPage;

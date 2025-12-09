import { useState, useEffect } from 'react'
import {
  getUpcomingBills,
  createUpcomingBill,
  updateUpcomingBill,
  deleteUpcomingBill,
} from '../../api/upcomingBillsApi'

function UpcomingBillsPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingBill, setEditingBill] = useState(null)

  const [name, setName] = useState('')
  const [due, setDue] = useState('')
  const [date, setDate] = useState('')

  const [bills, setBills] = useState([])

  //  to calculate days left
  const getDaysLeft = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Format date
  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('en-GB')
  }

  useEffect(() => {
    async function loadBills() {
      try {
        const data = await getUpcomingBills()
        setBills(data)
      } catch (err) {
        console.error('Failed to load bills', err)
      }
    }
    loadBills()
  }, [])

  const handleAddBill = async (e) => {
    e.preventDefault()
    const newBill = { name, due: Number(due), date }
    const created = await createUpcomingBill(newBill)
    setBills([...bills, created])
    setName('')
    setDue('')
    setDate('')
    setShowForm(false)
  }

  const startEditing = (bill) => {
    setEditingBill({ ...bill })
    setShowForm(false)
  }

  const saveEdit = async (e) => {
    e.preventDefault()
    const updated = await updateUpcomingBill(editingBill._id, editingBill)
    setBills(bills.map((b) => (b._id === updated._id ? updated : b)))
    setEditingBill(null)
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this bill?'
    )
    if (!confirmed) return
    await deleteUpcomingBill(id)
    setBills(bills.filter((b) => b._id !== id))
    if (editingBill && editingBill._id === id) setEditingBill(null)
  }

  return (
    <div className='min-h-screen bg-gray-100 px-8 py-6'>
      <h1 className='text-3xl font-bold mb-6'>Upcoming Bills</h1>

      <div className='bg-white p-4 shadow-sm border rounded-xl flex justify-between items-center'>
        <h2 className='text-xl font-semibold'>Your Bills</h2>
        <button
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg'
          onClick={() => {
            setEditingBill(null)
            setShowForm(!showForm)
          }}>
          Add New
        </button>
      </div>

      {/* Add Bill Form */}
      {showForm && !editingBill && (
        <div className='bg-white mt-4 p-6 rounded-xl shadow border'>
          <h3 className='text-xl font-semibold mb-4'>Add New Bill</h3>
          <form
            className='grid grid-cols-1 sm:grid-cols-2 gap-4'
            onSubmit={handleAddBill}>
            <div>
              <label className='block font-medium mb-1'>Bill Name</label>
              <input
                type='text'
                className='w-full border rounded-lg px-3 py-2'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className='block font-medium mb-1'>Amount (€)</label>
              <input
                type='number'
                className='w-full border rounded-lg px-3 py-2'
                value={due}
                onChange={(e) => setDue(e.target.value)}
                required
              />
            </div>

            <div>
              <label className='block font-medium mb-1'>Due Date</label>
              <input
                type='date'
                className='w-full border rounded-lg px-3 py-2'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className='col-span-full mt-4 flex gap-4'>
              <button
                type='submit'
                className='bg-blue-600 text-white px-4 py-2 rounded-lg'>
                Save Bill
              </button>
              <button
                type='button'
                className='px-4 py-2 rounded-lg border'
                onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Bill Form */}
      {editingBill && (
        <div className='bg-white mt-4 p-6 rounded-xl shadow border'>
          <h3 className='text-xl font-semibold mb-4'>Edit Bill</h3>
          <form
            className='grid grid-cols-1 sm:grid-cols-2 gap-4'
            onSubmit={saveEdit}>
            <div>
              <label className='block font-medium mb-1'>Bill Name</label>
              <input
                type='text'
                className='w-full border rounded-lg px-3 py-2'
                value={editingBill.name}
                onChange={(e) =>
                  setEditingBill({ ...editingBill, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className='block font-medium mb-1'>Amount (€)</label>
              <input
                type='number'
                className='w-full border rounded-lg px-3 py-2'
                value={editingBill.due}
                onChange={(e) =>
                  setEditingBill({ ...editingBill, due: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className='block font-medium mb-1'>Due Date</label>
              <input
                type='date'
                className='w-full border rounded-lg px-3 py-2'
                value={editingBill.date}
                onChange={(e) =>
                  setEditingBill({ ...editingBill, date: e.target.value })
                }
                required
              />
            </div>

            <div className='col-span-full mt-4 flex gap-4'>
              <button
                type='submit'
                className='bg-blue-600 text-white px-4 py-2 rounded-lg'>
                Save Changes
              </button>
              <button
                type='button'
                className='px-4 py-2 rounded-lg border'
                onClick={() => setEditingBill(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bills Table */}
      <div className='bg-white mt-6 p-6 rounded-xl shadow border'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='text-gray-400 text-left'>
              <th>Deadline</th>
              <th>Due Date</th>
              <th>Name</th>
              <th className='text-right'>Amount (€)</th>
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((b, index) => (
              <tr
                key={b._id || `${b.name}-${b.date}-${index}`}
                className='border-t'>
                <td className='py-2'>
                  {getDaysLeft(b.date) < 0 ? (
                    <div className='px-2 py-0.5 bg-red-50 rounded-full outline outline-[0.5px] outline-offset-[-0.5px] outline-red-500 inline-flex justify-center items-center'>
                      <div className='text-red-700 text-xs font-medium'>
                        Late by {Math.abs(getDaysLeft(b.date))} days
                      </div>
                    </div>
                  ) : (
                    <div className='text-black text-xs font-medium'>
                      {getDaysLeft(b.date)} days left
                    </div>
                  )}
                </td>
                <td>{formatDate(b.date)}</td>
                <td>{b.name}</td>
                <td className='text-right font-medium'>€{b.due}</td>
                <td className='text-right flex gap-2 justify-end items-center'>
                  <button
                    className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1  rounded-lg text-sm'
                    onClick={() => startEditing(b)}>
                    Edit
                  </button>
                  <button
                    className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm'
                    onClick={() => handleDelete(b._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UpcomingBillsPage

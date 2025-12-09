const API_URL = '/api/upcoming-bills'

export async function getUpcomingBills() {
  const res = await fetch('/api/upcoming-bills', {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
  })
  return res.json()
}

export async function createUpcomingBill(bill) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(bill),
  })
  return res.json()
}

export async function updateUpcomingBill(id, bill) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(bill),
  })
  return res.json()
}

export async function deleteUpcomingBill(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  })
  return res.json()
}

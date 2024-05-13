export const getUsers = async () => {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const addhistory = async (username, history) => {
    const response = await fetch('/api/history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, history }),
    });
    if (!response.ok) {
        throw new Error('Failed to add history');
    }
    return response.json();
};

export const gethistory = async (username) => {
    const response = await fetch(`/api/history/${username}`);
    if (!response.ok) {
        throw new Error('Failed to fetch history');
    }
    return response.json();
};
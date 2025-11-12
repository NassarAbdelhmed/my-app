'use client'
import { useState, useEffect } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  // Backend URL from environment variable
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://express-service:3000';

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/api/items`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    try {
      await fetch(`${API_URL}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, value: Math.random() * 100 })
      });
      setName('');
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div>
      <h1>My Full Stack App</h1>
      <div>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Item name" 
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name} - {item.value}</li>
        ))}
      </ul>
    </div>
  );
}
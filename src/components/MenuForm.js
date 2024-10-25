// src/components/MenuForm.js
import { useContext, useState } from 'react';
import { MenuContext } from '../context/MenuContext';

const MenuForm = () => {
  const { addMenuItem } = useContext(MenuContext);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { id: Date.now(), name, children: [] }; // Add a basic item structure
    addMenuItem(newItem);
    setName(''); // Clear the input
  };

  return (
    <form onSubmit={handleSubmit} className="menu-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add menu item"
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default MenuForm;

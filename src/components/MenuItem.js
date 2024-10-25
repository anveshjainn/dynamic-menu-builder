import { useContext, useState } from 'react';
import { MenuContext } from '../context/MenuContext';

const MenuItem = ({ item }) => {
  const { addMenuItem, editMenuItem, deleteMenuItem } = useContext(MenuContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const [isAddingSubmenu, setIsAddingSubmenu] = useState(false);
  const [submenuName, setSubmenuName] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false); 

  const handleSave = () => {
    if (newName.trim()) {
      editMenuItem(item.id, { ...item, name: newName });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    deleteMenuItem(item.id);
  };

  const handleAddSubmenu = () => {
    if (submenuName.trim()) {
      const newSubmenu = { id: Date.now(), name: submenuName, children: [] };
      addMenuItem(newSubmenu, item.id);
      setSubmenuName(''); 
      setIsAddingSubmenu(false);
    }
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          {item.name}
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => setIsAddingSubmenu(!isAddingSubmenu)}>
        {isAddingSubmenu ? "Cancel Submenu" : "Add Submenu"}
      </button>
      
      {}
      {item.children.length > 0 && (
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? "Expand" : "Collapse"}
        </button>
      )}

      {isAddingSubmenu && (
        <>
          <input
            type="text"
            value={submenuName}
            onChange={(e) => setSubmenuName(e.target.value)}
            placeholder="Submenu name"
          />
          <button onClick={handleAddSubmenu}>Save Submenu</button>
        </>
      )}

      {}
      {!isCollapsed && item.children.length > 0 && (
        <ul>
          {item.children.map((child) => (
            <MenuItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;





  
// src/context/MenuContext.js
import { createContext, useState, useEffect } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(() => {
    const savedMenu = localStorage.getItem('menuItems');
    return savedMenu ? JSON.parse(savedMenu) : [];
  });

  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  const addSubmenu = (parentId, newItem, items) => {
    return items.map(item => {
      if (item.id === parentId) {
        return {
          ...item,
          children: [...item.children, newItem],
        };
      }
      if (item.children.length > 0) {
        return { ...item, children: addSubmenu(parentId, newItem, item.children) };
      }
      return item;
    });
  };

  const addMenuItem = (newItem, parentId = null) => {
    if (parentId === null) {
      setMenuItems([...menuItems, newItem]); // Add as a top-level item
    } else {
      setMenuItems(addSubmenu(parentId, newItem, menuItems)); // Add as a submenu
    }
  };

  const editMenuItem = (id, updatedItem) => {
    const updateItems = (items) => {
      return items.map(item => {
        if (item.id === id) {
          return updatedItem;
        }
        if (item.children.length > 0) {
          return { ...item, children: updateItems(item.children) };
        }
        return item;
      });
    };
    setMenuItems(updateItems(menuItems));
  };

  const deleteMenuItem = (id) => {
    const removeItem = (items) => {
      return items.filter(item => {
        if (item.id === id) return false;
        if (item.children.length > 0) {
          item.children = removeItem(item.children);
        }
        return true;
      });
    };
    setMenuItems(removeItem(menuItems));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, editMenuItem, deleteMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};


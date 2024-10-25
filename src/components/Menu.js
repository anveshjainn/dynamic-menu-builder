import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';
import MenuItem from './MenuItem';

const Menu = () => {
  const { menuItems } = useContext(MenuContext);

  return (
    <div className="menu">
      <ul>
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default Menu;

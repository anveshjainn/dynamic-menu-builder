import './App.css';
import { MenuProvider } from './context/MenuContext';
import Menu from './components/Menu';
import MenuForm from './components/MenuForm';

function App() {
  return (
    <MenuProvider>
      <div className="App">
        <h1>Dynamic Menu Builder</h1>
        <MenuForm />
        <Menu />
      </div>
    </MenuProvider>
  );
}

export default App;

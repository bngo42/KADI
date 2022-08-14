import ShoppingListGrid from 'components/shopping-list-grid/shopping-list-grid';
import './App.scss';
import Logo from 'assets/logo.png';

function App() {
  return (
    <div className="wrapper">
        <header className="header">
            <img height="100%" src={ Logo } alt="Logo"/>
            <button className="btn">Ajouter une liste</button>
        </header>

        <div className="main-content">
            <ShoppingListGrid/>
        </div>
    </div>
  );
}

export default App;

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

        </div>
    </div>
  );
}

export default App;

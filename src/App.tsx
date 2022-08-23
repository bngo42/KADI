import {Link, Navigate, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

import ShoppingListGrid from 'components/shopping-list-grid/shopping-list-grid';
import ShoppingList from "components/shopping-list/shopping-list";
import {getParsedLocalStorageItem, setLocalStorageItem} from "utils/storage.utils";

import {ViewMode} from "models/view.model";
import {tempData} from "models/shopping-list.model";

import Logo from 'assets/logo.png';
import './App.scss';

function App() {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState('/');
  const location = useLocation();

  useEffect(() => {
    const list = getParsedLocalStorageItem('shopping-lists');

    if (!list) {
      setLocalStorageItem('shopping-lists', [tempData]);
    }
  }, []);
  useEffect(() => setCurrentLocation(location.pathname), [location]);

  return (
    <div className="wrapper">
      <header className="header">
        <img height="75%" src={ Logo } alt="Logo"/>
        {
          currentLocation === '/' ?
          <button className="btn" onClick={ createNewList }>Ajouter une liste</button>
          : <Link className="btn" to="/">Retour</Link>
        }
      </header>

      <div className="main-content">
        <Routes>
            <Route path="/" element={ <ShoppingListGrid/> }/>
            <Route path="/list/:id" element={ <ShoppingList/> }/>
            <Route path="*" element={ <Navigate replace to="/" /> }/>
        </Routes>
      </div>
    </div>
  );

  function createNewList() {
    navigate("/list", { state: { view: ViewMode.Edit } });
  }
}

export default App;

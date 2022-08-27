import {Link, Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import ShoppingListGrid from 'components/shopping-list-grid/shopping-list-grid';
import ShoppingList from "components/shopping-list/shopping-list";
import {getParsedLocalStorageItem, setLocalStorageItem} from "utils/storage.utils";
import ListService from "./services/list.service";

import Logo from 'assets/logo.png';
import './App.scss';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState('/');
  const navigateToNewList = (): void => {
    const newUID = ListService.getUID();
    navigate(`/list/${ newUID }`, {
      state: {
        editMode: true,
        newList: true
      }
    });
  }

  useEffect(() => {
    const list = getParsedLocalStorageItem('shopping-lists');

    if (!list) {
      setLocalStorageItem('shopping-lists', []);
    }
  }, []);
  useEffect(() => setCurrentLocation(location.pathname), [location]);

  return (
    <div className="wrapper">
      <header className="header">
        <img height="75%" src={ Logo } alt="Logo"/>
        {
          currentLocation === '/' ?
          <button className="btn" onClick={ navigateToNewList }>Ajouter une liste</button>
          : <Link className="btn" to="/">Retour</Link>
        }
      </header>

      <div className="main-content">
        <Routes>
            <Route path="/" element={ <ShoppingListGrid/> }/>
            <Route path="/list/:listId" element={ <ShoppingList/> }/>
            <Route path="*" element={ <Navigate replace to="/" /> }/>
        </Routes>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ChatList from './ChatList';
import HeaderMenu from './common/HeaderMenu';

function App() {
  return (
    <BrowserRouter>
      <HeaderMenu />
      <div className="App">
        <Route path="/chat-list" exact component={ChatList} />
      </div>
    </BrowserRouter>
  );
}

export default App;

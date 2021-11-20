import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {DataProvider} from './GlobalState';
import Header from './components/headers/Header';
import Pages from './mainPages/Pages';
import Footer from './components/footer/Footer';

export default function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header/>
          <Pages/>
          <Footer/>
        </div>
      </Router>
    </DataProvider>

  )     
}

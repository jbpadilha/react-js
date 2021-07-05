import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import Navigation from './pages/Navigation';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Please wait...</div>}>
        <Switch>
          <Route path="/">
            <Navigation />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;

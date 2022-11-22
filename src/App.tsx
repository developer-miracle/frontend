import React from 'react';
import Home from './components/pages/Home'
import SignUp from './components/pages/SignUp'
import SignIn from './components/pages/SignIn'
import { Route, Routes } from 'react-router'
import { Link, BrowserRouter as Router } from 'react-router-dom'

import Todo from './components/Todo'

function App() {
  return (
    <div>
      {/* <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/signin">signin</Link>
          <Link to="/signup">signup</Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
      </Router> */}

      <Todo />
    </div>
  );
}

export default App;

import {Route, Routes} from 'react-router-dom'
import './App.css';

import Header from './components/layout/layout.component'
import Home from './routes/home/home.component'

function App() {
  return (
    <div className='App'>
        <Routes>
          <Route element={<Header/>} path='/'>
            <Route element={<Home/>} index/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;

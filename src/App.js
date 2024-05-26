import {Route, Routes} from 'react-router-dom'
import './App.css';

import Header from './components/layout/layout.component'
import Home from './routes/home/home.component'
import Gustavo from 'routes/gustavo/gustavo.component';
import BirthdayBot from 'routes/birthday-bot/birthday-bot.component';
import ConsoleComponent from 'routes/console/console.component';

function App() {
  return (
    <div className='App'>
        <Routes>
          <Route element={<Header/>} path='/'>
            <Route element={<Home/>} index/>
            <Route element={<Gustavo/> } path='/gustavo'/>
            <Route element={<BirthdayBot/>} path='/birthday-bot'/>
            <Route element={<ConsoleComponent/>} path='/console'/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;

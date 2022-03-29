import { BrowserRouter, Route, Switch } from 'react-router-dom'

// styles
import './App.css'

//import Home from './pages/home/Home';
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Navbar from './components/Navbar'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Sidebar /> */}
        {/*<Navbar />*/}
        <div className='container'>
          <Navbar />
          <Switch>
            {/* <Route exact path="/" render={() => <Dashboard />}> */}

            {/* </Route>

            {/* <Route exact path="/create" render={() => <Create />}> */}

            {/* </Route> */}

            {/* <Route exact path="/post:id" render={() => <Post />}> */}

            {/* </Route> */}
            <Route exact path="/login" render={() => <Login />}>

            </Route>
            <Route path="/register" render={() => <Register />}>

            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

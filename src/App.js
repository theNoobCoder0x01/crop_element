import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Switch>
          <Route className="active" path="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
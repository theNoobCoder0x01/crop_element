import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import CropDiseaseDetection from './pages/CropDiseaseDetection';
import CropRecommendation from './pages/CropRecommendation';
import WeatherForecast from './pages/WeatherForecast';
import Welcome from './pages/Welcome';

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/crop_recommendation" component={CropRecommendation} />
          <Route path="/crop_disease_detection" component={CropDiseaseDetection} />
          <Route path="/weather_forecast" component={WeatherForecast} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
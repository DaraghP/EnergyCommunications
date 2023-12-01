import './App.css';
import Header from './Header';
import Agenda from './Agenda';
import FileFrontend from './FileFrontend';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
    return (
      <Router>
        <Header/>
        <Routes>
          {/* Agenda is default homescreen, accessed also via mail, profile buttons in this example */}
          <Route exact path="/" element={<Agenda/>} />
          {/* File frontend is access through menu button in this case */}
          <Route path="/file-frontend" element={<FileFrontend />} />
        </Routes>
      </Router>
  );
}

export default App;
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
          <Route exact path="/" element={<Agenda/>} />
          <Route path="/file-frontend" element={<FileFrontend />} />
        </Routes>
      </Router>
    // <div class="bg-gray-200">
    //   <div class="p-3">
    //     <Header/>
    //     <Agenda/>
    //   </div>
    // </div>
  );
}

export default App;
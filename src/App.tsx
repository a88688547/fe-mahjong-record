// reset CSS
import "./style/reset.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { HomePage, TestPage } from "./pages";

function App() {
  return (
    <div className="App h-[100vh]">
      <div className="text-[red]">123123</div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
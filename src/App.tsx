import React from "react";
import logo from "./logo.svg";
// import './App.css';

// reset CSS
import "./style/reset.css";
import {
  Route,
  NavLink,
  HashRouter,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import { HomePage, TestPage } from "./pages";

function App() {
  return (
    <div className="App h-[100vh]">
      {/* <div className="h-[100px] border-2 border-solid border-[green]">header</div>
      <div className="h-[calc(100vh-200px)] relative"> */}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage/>}/>
              {/* <Route path="/Album" component={Album}/> */}
          </Routes>
        </BrowserRouter>
      {/* </div> */}
    </div>
  );
}

export default App;

// import AppRoutes from './routes';

// const App = () => {
//   return <AppRoutes />;
// };
// export default App;

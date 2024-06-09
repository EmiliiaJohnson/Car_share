import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/header";
import MainPage from "./components/MainPage/main-page";
import CarDetails from "./components/CarDetails/car-details";
import InDevelopment from "./components/InDevelopment/in-development";

const routesData = [
  { path: "/", element: <MainPage /> },
  { path: "/development", element: <InDevelopment /> },
  { path: "/cars/:id", element: <CarDetails /> },
  { path: "*", element: <div>Page not found</div> },
];

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            {routesData.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstScreen from "./screen/FirstScreen.jsx";
import ActivityScreen from "./screen/ActivityScreen.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstScreen />} />
        <Route path="/activity" element={<ActivityScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

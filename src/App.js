import PatientsList from "./users/Display";
import AddUser from "./users/Create";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import EditPatient from "./users/Edit";

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route path="/" element={<PatientsList />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/edituser/:id" element={<EditPatient />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

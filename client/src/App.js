import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from './Routes/User';
import Admin from './Routes/Admin';
import { Toaster } from "react-hot-toast";

function App() {
 
  return (
    < >
       <Router>
       <Toaster position="top-center" reverseOrder={false} />
       <Routes>
        <Route path='/*' element={<User/>}/>
       </Routes>
       <Routes>
        <Route path='/admin/*' element={<Admin/>}/>
       </Routes>
    </Router>
    </>
  );
}

export default App;

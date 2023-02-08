import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from './Routes/User';
import Admin from './Routes/Admin';
import { Toaster } from "react-hot-toast";
import { useSelector } from 'react-redux';
import Spinner from './components/user/spinner/Spinner';
import Error from './pages/user/Error';

function App() {
const {loading}=useSelector(state=>state.alerts)
  return (
    < >

      <Router>
      {loading && <Spinner/>}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path='/*' element={<User />} />
        </Routes>
        <Routes>
          <Route path='/admin/*' element={<Admin />} />
        </Routes>
        {/* <Routes>
          <Route path='*' element={<Error />} />
        </Routes> */}
      </Router>
    </>
  );
}

export default App;

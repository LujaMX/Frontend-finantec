import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Bienvenida from './pages/Bienvenida/Bienvenida';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import Welcome from './pages/Main/Welcome';
//import Form from './pages/Form/Form';

const App = () => {
  return (
    <Routes>
      {/* Rutas que usan el MainLayout */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<Bienvenida />} />
        <Route path='/order' element={<PlaceOrder />} />
      </Route>

      {/* Rutas que usan el AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/welcome' element={<Welcome />} />
      </Route>
    </Routes>
  );
};

export default App;

import './App.css';
import Login from './componants/login';
import Home from './componants/user/home';
import {BrowserRouter  ,Route, Routes } from 'react-router-dom';
import ProtectedRoute from './componants/ProtectedRoute';
import Register from './componants/register';
import { useAuth } from './context/AuthContext';
import Dashboard from './componants/admin/dashboard';
import { useEffect } from 'react';
import AdminRoute from './componants/AdminRoute';



function App() {
  //  we will declatre const called user if the user is admin then the home route will display the dashboard componant 
  //  else if the user role is user then it will display the user home componant
  const {user} = useAuth();
  console.log("User data in App:", user);
useEffect(() => {
  document.title = "Mern App 2025";
}, []);
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>

            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={user?.role=== 'admin' ? <AdminRoute><Dashboard/></AdminRoute> : <ProtectedRoute><Home/></ProtectedRoute> }/>
            <Route path='/register' element={<Register/>}/>
            {/* 404 */}
            <Route path='*' element={<h1>404 - Not Found</h1>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import Login from './componants/login';
import Home from './componants/user/home';
import {BrowserRouter  ,Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './componants/ProtectedRoute';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

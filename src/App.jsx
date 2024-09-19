// src/App.js
import './App.css';
import AdminDashboardComponent from './components/admin/AdminDashboardComponent';
import EmployeeComponent from './components/admin/employee/EmployeeComponent';
import FooterComponent from './components/admin/employee/FooterComponent';
import HeaderComponent from './components/admin/employee/HeaderComponent';
import ListEmployeeComponent from './components/admin/employee/ListEmpolyeeComponent'; 
import ListEquipeComponent from './components/admin/equipe/ListEquipeComponent';
import ProjetComponent from './components/admin/project/ProjetComponent';
import LoginComponent from './components/login/LoginComponent';
import ManagerComponent from './components/manager/ManagerComponent';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<LoginComponent />} />
      <Route path='/projects' element={<ProjetComponent />} />
        <Route path='/employees' element={<ListEmployeeComponent />} />
        <Route path='/equipe' element={<ListEquipeComponent />} />
        <Route path='/add-employee' element={<EmployeeComponent />} />
        <Route path='/employees' element={<Navigate to='/employees' />} /> {/* Redirection vers la liste des employés */}
        <Route path='/dashbord' element={<AdminDashboardComponent />}/>
        <Route path='/manager' element={<ManagerComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

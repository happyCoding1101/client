
import './App.css';
import { Routes, Route, Navigate} from 'react-router-dom';
import { useState, useEffect, createContext} from "react";
import axiosTalents from './api/axiosTalents';
import axiosTrainings from './api/axiosTrainings';

import Login from './feature/auth/Login';
import Navbar from './feature/shared/Navbar';
import Home from './feature/shared/Home';

import UserContext from './feature/shared/user-context';
import TalentsHome from './feature/talents/TalentsHome';
import TrainingsHome from './feature/trainings/TrainingsHome';
import Protected from './components/Protected';


// export const UserContext = createContext();
export const TalentContext = createContext();
export const DataContext = createContext();

const TALENT_URL = ''

function App() {
  const [roles, setRoles] = useState();
  const value = { roles, setRoles };

  // const [user, setUser] = useState(sessionStorage.getItem('user'));

  const [role, setRole] = useState(0);

  const [talents, setTalents] = useState()
  const [trainings, setTrainings] = useState()
  const [refresh, setRefresh] = useState(false);
  



  useEffect(() => {  
    getTalents();
    getTrainings();

    // "Admin": 5150,
    // "Editor": 1984,
    // "User": 2001

    // if(localStorage.getItem('roles')){
    //   const role_code = localStorage.getItem('roles');
    //   if (role_code.indexOf('5150') != -1) { setRole = 3}
    //   else if (role_code.indexOf('1984') != -1) { setRole = 2}
    //   else if (role_code.indexOf('2001') != -1) { setRole = 1 }
    //   else setRole = 0

    // }


  

  },[]);



const getTalents = async () => {
    try {
        const resp = await axiosTalents.get('', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
        console.log(resp.data);
        setTalents(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};



const getTrainings = async () => {
  try {
      const resp = await axiosTrainings.get('', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
      console.log(resp.data);
      const data = resp.data.sort((a, b) => a.id > b.id)
      setTrainings(data);
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }
};

// const isAuth = (accessLevel) => {
//   return role >= accessLevel?
// }


  return (
    <DataContext.Provider value={{talents: [talents, setTalents], trainings: [trainings, setTrainings], role:[role, setRole], roles:[roles, setRoles],refresh: [refresh, setRefresh]}}>
    {/* <UserContext.Provider value={value} > */}
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />

          {/* <Route path='talents/*' element={
            <Protected isAuth={role >= 2}>
              <TalentsHome />
            </Protected>
          } />
          <Route path='trainings/*' element={
            <Protected isAuth={role >= 2}>
              <TrainingsHome />
            </Protected>
          } /> */}

          <Route path='talents/*' element={
          
              <TalentsHome />

          } />
          <Route path='trainings/*' element={

              <TrainingsHome />

          } />

          <Route path='login' element= {<Login />}  />
          {/* <Route path='register' element={id? <Navigate replace to='/Dashboard/*' /> : <Register />} /> */}
          {/* <Route path='Dashboard/*' element={role >=3? <UserDashboard />
                                            :role == 'admin'? <AdminDashboard />
                                            : <Navigate replace to="/login" />
                                            } />
             */}

      </Routes>
    {/* </DataContext.Provider> */}
    {/* </UserContext.Provider> */}
    </DataContext.Provider>

    
  );
}

export default App;

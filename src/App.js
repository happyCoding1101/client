
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


// export const UserContext = createContext();
export const TalentContext = createContext();
export const DataContext = createContext();

const TALENT_URL = ''

function App() {
  const [roles, setRoles] = useState("en");
  const value = { roles, setRoles };

  const [user, setUser] = useState(sessionStorage.getItem('user'));
  // const [role, setRole] = useState(sessionStorage.getItem('role'));

  const [talents, setTalents] = useState()
  const [trainings, setTrainings] = useState()
  const [refresh, setRefresh] = useState(false);



  useEffect(() => {  
    getTalents();
    getTrainings();

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


  const getTalentss = (()=> {

    // axiosTalents.get(TALENT_URL, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} }).then((res) => {
    //   console.log('inside home axios get talents')
    //   console.log(res.data)
    //   setTalents(res.data);
    // })
    // .catch ((err) =>{
    //     console.log(err);
    // }); 

    axiosTrainings.get('', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} }).then((res) => {
      console.log('inside home axios get trainings')
      console.log(res.data)
      setTrainings(res.data);
    })
    .catch ((err) =>{
        console.log(err);
    }); 
  })

  return (
    <DataContext.Provider value={{user: [user, setUser], talents: [talents, setTalents], trainings: [trainings, setTrainings], roles:[roles, setRoles], refresh: [refresh, setRefresh]}}>
    {/* <UserContext.Provider value={value} > */}
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path='talents/*' element={<TalentsHome />} />
          <Route path='trainings/*' element={<TrainingsHome />} />
          <Route path='login' element= {<Login />}  />
          {/* <Route path='register' element={id? <Navigate replace to='/Dashboard/*' /> : <Register />} />
          <Route path='Dashboard/*' element={role === 'customer'? <UserDashboard />
                                            :role == 'admin'? <AdminDashboard />
                                            : <Navigate replace to="/login" />
                                            } /> */}
            

      </Routes>
    {/* </DataContext.Provider> */}
    {/* </UserContext.Provider> */}
    </DataContext.Provider>

    
  );
}

export default App;

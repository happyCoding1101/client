import React, { useState, useContext, useCallback, useEffect } from 'react';
import logo from '../../assets/DS_logo.png';
import axios from '../../api/axiosBase';
// import { DataContext } from '../../App';
import { DataContext } from '../../App';
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';

const LOGOUT_URL = '/logout';
function Navbar() {
    const {role} = useContext(DataContext);
    const [userRole, setRole] = role;
    const {roles, setRoles} = useContext(DataContext);
    // const {user, role} = useContext(DataContext);
    // const [idVal, setIdVal] = id;
    // const [userVal, setUserVal] = user;
    // const [roleVal, setRoleVal] = useState();

    const navigate = useNavigate();
    const redirecteTo= useCallback((destination) => navigate(destination, {replace: true}), [navigate]);
    
    // // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const handleLogin = () => {
    //     console.log('Will route to sign in page in later assignment');
    //     redirecteTo('/login');
    // }
    useEffect(() => {  
    
        // console.log(userRole);
        // if(userRole) {
        //     console.log(userRole.find(e => e == 5150));
        //     // console.log(userRole.find(e => e == 51500));

        // }
        
    });

    const handleSignOut = () => {

        console.log("signing out ...")
        axios.get(LOGOUT_URL);
        setRole(0);
        localStorage.clear();
        redirecteTo('/login');

        // setIdVal(null);
        // setUserVal(null);
        // setRoleVal(null);

        // setIsLoggedIn(false);
    }

  return (
    <nav className="navbar">
        <Link to='/' className="navbar-brand" >
            <img src={logo} style={{width: 150, height: '100%'}} alt="dsLogo" />
        </Link>
        
        
        <div className="d-flex justify-content-right">
        
        {
                localStorage.getItem('roles') && (localStorage.getItem('roles').indexOf('5150') != -1 || localStorage.getItem('roles').indexOf('1984') != -1)?
                // role >= 2?
                <>
                    <Link to='/talents' className='btn' >Talents Portal</Link>
                    <Link to='/trainings' className='btn' >Trainings Portal</Link>
                    <Link to='/' className='btn' >Courses Portal</Link>
                    <Link to='/' className='btn' >Instructors Portal</Link>

                    <button className='btn btn-info' disabled>Welcome!</button>
                    <button className='btn' onClick={handleSignOut} >Sign Out</button>

                </>  
                // :  localStorage.getItem('roles') && localStorage.getItem('roles').indexOf('5150') != -1?
                // <>
                // {/* <Link to='/talents' className='btn' >Talents Portal</Link>
                // <Link to='/trainings' className='btn' >Trainings Portal</Link> */}
                // <button className='btn' onClick={handleSignOut} >Sign Out</button>
                // </>
                : localStorage.getItem('roles')?   
                // : role >= 1?     
                <>

                    <Link to='/' className='btn'>Home</Link>
                    <Link to='/talents' className='btn' >Talents Portal</Link>
                    <Link to='/trainings' className='btn' >Trainings Portal</Link>
                    <button className='btn' onClick={handleSignOut} >Sign Out</button>

                    
                </> 
                :
                <>
                {/* <Link to='/register' className='btn' >Register</Link> */}
                    <Link to='/login' className='btn' >Login</Link>
                </>
            }

        </div>
    </nav>
  )
}

export default Navbar
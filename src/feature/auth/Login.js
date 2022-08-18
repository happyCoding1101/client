import React, { useState, useContext, useCallback } from 'react';
import axios from '../../api/axiosBase';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../App';
import UserContext from '../shared/user-context';

const AUTH_URL = '/auth';
function Login() {
    const { roles, setRoles} = useContext(UserContext);
    const {user, role} = useContext(DataContext);
    const [roleVal, setRoleVal] = role;

    const [data, setData] = useState({ user: "", pwd: "" });
	const [errMsg, setError] = useState("");

    const navigate = useNavigate();
    const redirecteTo= useCallback((destination) => navigate(destination, {replace: true}), [navigate]);


    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			
            // console.log(res.user);
			const { data: res } = await axios.post(AUTH_URL, data);
            setError('');
            console.log(res)
            // localStorage.setItem("user", res.username)
			localStorage.setItem("token", res.accessToken); 
            localStorage.setItem("roles", res.roles);
            setRoleVal(res.roles);
            redirecteTo('/');
		} catch (error) {
			if ( error.response.status == 401 ) {
				setError('Invalid Credentials');
			} else {
				setError('Something went wrong, please try again');
			}
		}
	};

  return (
     
    <section className='formContainer'>
        <div id='loginForm'>
            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h3>Sign In</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="user">Email:</label>
                <input
                    type="text"
                    id="user"
                    autoComplete="off"
                    name="user"
                    onChange={handleChange}
                    value={data.user}
                    required
                />

                <label htmlFor="pwd">Password:</label>
                <input
                    type="password"
                    id="pwd"
                    name="pwd"
                    onChange={handleChange}
                    value={data.pwd}
                    required
                />
                <br/><br />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account? Contact your mentor for assistance<br />
                {/* <span className="line">
                    <Link to='/register' >Sign Up</Link>
                </span> */}
            </p>
        </div>
    </section>
  )
}

export default Login
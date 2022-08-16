import React, {useContext} from 'react'
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Select from 'react-select';
import data from '../../const.json';
import axios from '../../api/axiosTalents';
import {Link} from 'react-router-dom';
import { DataContext } from '../../App';


const USER_REGEX = /^[A-z][A-z ]{2,200}$/;
const NUM_REGEX = /^[0-9]{4}$/;
const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
// const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{4,24}$/;
// const USERS_URL = '/users';

const TALENT_URL = '/talents';
function AddTalent() {
    const {talents, refresh} = useContext(DataContext);
    const [talentList, setTalentList] = talents;
    const [refreshList, setRefreshList] = refresh;

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [id, setId] = useState();
    const userRef = useRef();

    // const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [talentName, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    // const [role] = useState('customer');

    const [client, setClient] = useState('');
    const [validClient, setValidClient] = useState(false);
    const [clientFocus, setClientFocus] = useState(false);

    // const currentPRef = useRef();
    const [title, setTitle] = useState('');
    const [validTitle, setValidTitle] = useState(false);
    const [currentPFocus, setTitleFocus] = useState(false);

    const [linkedIn, setLinkedIn] = useState('');

    const [experiences, setExperiences] = useState(
        [{
            employer: "",
            title: "",
            start: "",
            end: ""

        }]
    );

    const [educations, setEducations] = useState(
        [{
            degree: "",
            school: "",
            major: "",
            graduate_year: ""

        }]
    );

    const [DStraining, setDStraining] = useState(
        [{
            t_id: "",
            trainingName: "",
            batchNo: "",
            startDate: ""
        }]
    );

    const [skills, setSkills] = useState([])



    useEffect(() => {
    }, [])

    useEffect(() => {
        // console.log(talentList);
        if(talentList) {
            // console.log('inside add---')
            // console.log(talentList)
            // console.log(talentList[talentList?.length - 1].id)
            // let lastId = 
            setId(Number(talentList[talentList?.length -1].id) + 1)
        }
    }, [talentList])

    useEffect(() => {
        const result = USER_REGEX.test(talentName);
        setValidName(result);
    }, [talentName])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
        const temp_user = checkEmailExist(talentList, {email});

        if (temp_user) {
            setValidEmail(false);
            setErrMsg('Email already taken');
            return;
        }
    }, [email])

    useEffect(() => {
        // const result = USER_REGEX.test(talentName);
        // setValidName(result);
        if (client && client.length > 0) {
            setValidClient(true);
        } else {
            setValidClient(false);
        }
    }, [client])

    useEffect (() => {
        setValidTitle((title && title.length > 0 )? true:false)
    }, [title])


    
    // client
    const handleClientChange = (e) => {
        setClient(e.target.value);
    }

    // experiences
    const handleClickAddExperience = ((e)=> {
        e.preventDefault();
        setExperiences([...experiences, { employer: "", title: "", start:"", end:"" }]);

    })

    const handleExperienceInput = (event, index) => {
        const { name, value} = event.target;
        console.log(name)
        console.log(value)
        const list = [...experiences];
        list[index][name] = value;
        console.log(list)
        setExperiences(list);
    };

    const handleRemoveExperience = index => {
        const list = [...experiences];
        list.splice(index, 1);
        setExperiences(list);
    };


    // educations
    const handleClickAddEducation = ((e)=> {
        e.preventDefault();
        setEducations([...educations, { degree: "", school: "", major: "", graduate_year: "" }]);

    })

    const handleEducationInput = (event, index) => {
        const { name, value} = event.target;
        console.log(name)
        console.log(value)
        const list = [...educations];
        list[index][name] = value;
        console.log(list)
        setEducations(list);
    };

    const handleRemoveEducation = index => {
        const list = [...educations];
        list.splice(index, 1);
        setEducations(list);
    };

    // DStraining
    const handleClickAddDStraining = ((e)=> {
        e.preventDefault();
        setDStraining([...DStraining, { degree: "", school: "", major: "", graduate_year: "" }]);

    })

    const handleDStrainingInput = (event, index) => {
        const { name, value} = event.target;
        console.log(name)
        console.log(value)
        const list = [...DStraining];
        list[index][name] = value;
        console.log(list)
        setDStraining(list);
    };

    const handleRemoveDStraining = index => {
        const list = [...DStraining];
        list.splice(index, 1);
        setDStraining(list);
    };
    
    const checkEmailExist = (serverUsers, formData) => {
        console.log('---------------- checking if email has been registered');
        const user = serverUsers.find(user => user.email === formData.email); 
         if (user) {
            console.log('-------- email taken!!!');
            return user;
         };
    };
    
    // Overall submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('------ inside submit')
        

        setId()
        console.log(JSON.stringify({ id, talentName, email, client, title, linkedIn, experiences, educations, DStraining, skills }))
        // JSON.stringify({ talentName, email, password, role })

        // check if the email has already be taken
        // const temp_user = await axios.get()
        //                             .then((res) => 
        //                             checkEmailExist(res.data, { id, email}));

        // const temp_user = checkEmailExist(talentList, { id, email});

        // if (temp_user) {
        //     setValidEmail(false);
        //     setErrMsg('Email already taken');
        //     return;
        // }

        try {
            const response = await axios.post('',
                JSON.stringify({ id, talentName, email, client, title, linkedIn, experiences, educations, DStraining, skills }),
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                        },
                    withCredentials: true
                }
               
            );

            setRefreshList(true);
            setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Error: Adding Failed')
            }
            errRef.current.focus();
        }
    }

    const handleAddAnother = (() => {
        setSuccess(false);
    })

    

    return (
    <>
        {success ? (
            <section className='container'>
                <h1>Success!</h1>
                <p>
                <Link to="/talents" >Back to Talent list</Link>
                </p>
                <button className='btn-primary' onClick={handleAddAnother}>Add another talent</button>
            </section>

        ) : (
            <div className='container w3-card-4'>
            <br/>
            <h2><b>Adding a Talent</b></h2>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
    
            <form onSubmit={handleSubmit} className="edit-form">
                <label htmlFor="talentName">
                    Talent Name: *
                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !talentName ? "hide" : "invalid"} />
                </label>
                <input
                    className='w3-input'
                    type="text"
                    id="name"
                    // ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={talentName}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && talentName && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Name can only container letters and spaces<br />
                    Name cannot be shorter than 2 characters<br />
                </p>


                <label htmlFor="talentName">
                    Email: *
                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                </label>
                <input
                    className='w3-input'
                    type="text"
                    id="email"
                    // ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                  
                <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Please enter valid email address.<br />
                </p>








        






                <label htmlFor="client">
                    Source From ... / Client: *
                    <FontAwesomeIcon icon={faCheck} className={validClient ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validClient || !client ? "hide" : "invalid"} />
                </label>
                <select 
                onChange={handleClientChange} 
                required
                aria-invalid={validClient ? "false" : "true"}
                aria-describedby="clientnote"
                onFocus={() => setClientFocus(true)}
                > 
                <option value=''> Select client name </option>
                {data.clients.map((client) => <option key={client.name} value={client.name}>{client.name}</option>)}
                </select>
                <p id="clientnote" className={clientFocus && !validClient ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must choose a client<br />
                </p>
        
                <label htmlFor="title">
                    Current Position: 
                    <FontAwesomeIcon icon={faCheck} className={validTitle ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validTitle || !title ? "hide" : "invalid"} />
                </label>
                <input
                    className='w3-input'
                    type="text"
                    id="title"
                    autoComplete="off"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    // required
                    aria-invalid={validTitle ? "false" : "true"}
                    aria-describedby="currentPnote"
                    onFocus={() => setTitleFocus(true)}
                />
                {/* <p id="currentPnote" className={currentPFocus && !validTitle ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Current position is required<br />
                </p> */}
        
        
                <label htmlFor="linkedIn">
                    linkedIn URL if available, or other personal CV page URL: 
                </label>
                <input
                    className='w3-input'
                    type="text"
                    id="linkedIn"
                    onChange={(e) => setLinkedIn(e.target.value)}
                    value={linkedIn}
                />
        
                <label htmlFor="experiences">
                    Previous related work experiences: 
                </label>
                {experiences.length == 0 && <button 
                className='btn-warning btn-add-option' 
                onClick={handleClickAddExperience}><b>+</b></button>}
        
                {experiences.map((x, i) => {
                    return (
        
                        <div className='container nested-form' key={i}>
                        <label>
                            Employer: &nbsp;
                        </label>
                        <input
                            className='w3-input'
                            type="text"
                            name="employer"
                            onChange={event => handleExperienceInput(event, i)}
                            value={x.employer}
                        />
        
                        <label>
                            Position: &nbsp;
                        </label>
                        <input
                            type="text"
                            name="title"
                            onChange={event => handleExperienceInput(event, i)}
                            value={x.title}
                            className='w3-input'
                        />
                        <br />
                        <div className='row'> 
                            <div className='col-lg-6 col-md-6 col-12'> 
                            <label>
                            Start year: &nbsp;
                            </label>
                            <input
                                type="number"
                                name="start"
                                onChange={event => handleExperienceInput(event, i)}
                                value={x.start}
                                className='year-input'
                            />
                            </div>
        
                            <div className='col-lg-6 col-md-6 col-12'> 
                            <label>
                            End year: &nbsp;
                            </label>
                            <input
                                type="number"
                                name="end"
                                onChange={event => handleExperienceInput(event, i)}
                                value={x.end}
                                className='year-input'
                            />
                            </div>
                        </div>
        
                        
                        <br />
                        <button className='btn-warning btn-add-option' onClick={handleClickAddExperience}>Add</button>&nbsp;
                        <button className='btn-secondary' onClick={() => handleRemoveExperience (i)}>Remove</button>
                        
                    </div>
                    )
                    
                    })
                }
        
                <label htmlFor="education">
                    Educations: 
                </label>
                {educations.length == 0 && <button 
                className='btn-warning btn-add-option' 
                onClick={handleClickAddEducation}><b>+</b></button>}
        
                {educations.map((x, i) => {
                    return (
                        <div className='container nested-form' key={i}>
                        <label>
                            Degree: &nbsp;
                        </label>
                        <input
                            className='w3-input'
                            type="text"
                            name="degree"
                            onChange={event => handleEducationInput(event, i)}
                            value={x.degree}
                        />
            
                        <label>
                            School: &nbsp;
                        </label>
                        <input
                            type="text"
                            name="school"
                            onChange={event => handleEducationInput(event, i)}
                            value={x.school}
                            className='w3-input'
                        />
        
                        <label>
                            Major: &nbsp;
                        </label>
                        <input
                            type="text"
                            name="major"
                            onChange={event => handleEducationInput(event, i)}
                            value={x.major}
                            className='w3-input'
                        /> 
        
                        <label>
                            Graduate Year: &nbsp;
                        </label>
                        <input
                            type="number"
                            name="graduate_year"
                            onChange={event => handleEducationInput(event, i)}
                            value={x.graduate_year}
                            className='year-input'
                        />
                        <br /><br />
                        <button className='btn-info btn-add-option' onClick={handleClickAddEducation}>Add</button>&nbsp;
                        <button className='btn-secondary' onClick={() => handleRemoveEducation(i)}>Remove</button>
                        
                    </div>
                    )
                    
                    })
                }        
                
                <label htmlFor="dsTraining">
                    Trainings with DS: 
                </label>
                {DStraining.length == 0 && <button 
                className='btn-warning btn-add-option' 
                onClick={handleClickAddDStraining}><b>+</b></button>}
        
                {DStraining.map((x, i) => {
                    return (
                        <div className='container nested-form' key={i}>
                        <label>
                            Program ID: &nbsp;
                        </label>
                        <input
                            className='w3-input'
                            type="text"
                            name="t_id"
                            onChange={event => handleDStrainingInput(event, i)}
                            value={x.t_id}
                        />
            
                        <label>
                            Program Name: &nbsp;
                        </label>
                        <input
                            type="text"
                            name="trainingName"
                            onChange={event => handleDStrainingInput(event, i)}
                            value={x.trainingName}
                            className='w3-input'
                        /><br />
        
                        <div className='row'>
                            <div className='col-lg-6 col-md-6 col-12'> 
                                <label>
                                    Batch No.: &nbsp;
                                </label>
                                <input
                                    type="number"
                                    name="batchNo"
                                    onChange={event => handleDStrainingInput(event, i)}
                                    value={x.batchNo}
                                    className='year-input'
                                /> 
                            </div>
                            
                            <div className='col-lg-6 col-md-6 col-12'> 
                            <label>
                                Start Date: &nbsp;
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                onChange={event => handleDStrainingInput(event, i)}
                                value={x.startDate}
                                className='year-input'
                            />
                            </div>
        
                            
                        </div>
                        <br />  
                        
                        <button className='btn-warning btn-add-option' onClick={handleClickAddDStraining}>Add</button>&nbsp;
                        <button className='btn-secondary' onClick={() => handleRemoveDStraining(i)}>Remove</button>
                        
                    </div>
                    )
                    
                    })
                }  
        
        
                <label htmlFor="skills">
                    Skills: *(Please seperate each skill with a "," and a space) 
                </label>
                <textarea 
                    placeholder="Example: HTML, CSS, Java" 
                    cols="30" 
                    rows="5"
                    id="skills"
                    onChange={(e) => setSkills(e.target.value)}
                    value={skills}
                    required
        
                ></textarea>
                {/* <input
                    className='w3-input'
                    type="textarea"
                    id="skills"
                    onChange={(e) => setSkills(e.target.value)}
                    value={skills}
                /> */}
        
        
                <br />
        
                {/* <button disabled={!validName || !validpassword || !validMatch ? true : false} type="submit" >Sign Up</button> */}
                <button type="submit" className='btn-primary'>Submit</button>
            </form>
    
    
    
        </div>
        )}

    </>
    )
}

export default AddTalent
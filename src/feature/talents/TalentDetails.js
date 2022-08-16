import React, {useState, useEffect, createContext, useContext, useCallback} from 'react';
import { DataContext } from '../../App';
import { useParams } from "react-router-dom";
import axiosTalents from '../../api/axiosTalents';
import DeleteConfirmation from '../../components/DeleteConfirmation';
import { Link, useNavigate } from 'react-router-dom';
// import { format } from "date-fns";

import './talentDetails.css';

const TALENT_URL = '';
const TRAINING_URL = '/talents';
const COURSE_URL = '/talents';
function TalentDetails() {
    const {refresh} = useContext(DataContext);
    const [refreshList, setRefreshList] = refresh;
    
    const { id } = useParams();
    const [talent, setTalent] = useState();
    const [skills, setSkills] = useState([]);

    const [trainings, setTraining] = useState();
    const [courses, setCourses] = useState();

    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);

    const navigate = useNavigate();
    const redirecteTo= useCallback((destination) => navigate(destination, {replace: true}), [navigate]);



    const getTalent = (()=> {
        axiosTalents.get(TALENT_URL+`/${id}`, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} }).then((res) => {
          console.log('inside home axios get talents')
          console.log(res.data)
          setTalent(res.data);
        })
        .catch ((err) =>{
            console.log(err);
        }); 
      })

    useEffect(() => {
        getTalent();
        // axios.get(TALENT_URL+`/${id}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} }).then((res) => {
        //                             // console.log('inside loanList axios')
        //                             console.log(res.data)
        //                             setTalent(res.data);
        //                         })
        //                         .catch ((err) =>{
        //                             console.log(err);
        //                         }); 
    },[]);

    useEffect(() => {
        
        if (talent) {
            // console.log(talent.skills);
            let myArray = talent.skills.split(", ");
            console.log(myArray);
            setSkills(myArray);

            console.log(talent.DStraining)
            for(let training of talent.DStraining) {
                console.log(training)
                console.log(training.t_id)
                // console.log(training.courses) 
                // for(let course of training.courses) {
                //     console.log(course.c_id)
                // }
            }
        }


    }, [talent])

    const showDeleteModal = (() => {
        setDeleteMessage(`Confirm to delete the talent #${id} '${talent.talentName}'?`);
        setDisplayConfirmationModal(true);
    })

    // Hide the modal
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    const submitDelete = (() => {
        axiosTalents.delete('', {data: { id: `${id}` }, headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} }).then((res) => {
            console.log('Axios delete!!')
            
            alert('This talent has been deleted')
            setRefreshList(true);
            redirecteTo('/talents');


        })
        .catch ((err) =>{
            console.log(err);
        }); 

        
    })


  return (
    <>
    {
        talent? (
            <div className='container'>
                <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{talent.talentName}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">{talent.title} - {talent.client} </h6>
                    <p>{talent.email}</p>
                    {
                        talent?.linkedIn?<a href={talent.linkedIn} className="card-link">LinkedIn</a>:<></>
                    }
                    
                    <br/><br/>
                    { 
                    talent?.experience?
                    <h6>Experiences</h6>:<></>
                    }
                    
                    { 
                        talent?.experience?.map( (e, i) => <li className="card-subtitle mb-2" key={i}>{e.title} - {e.employer} </li>)
                    }
                    <br/>
                    
                    { 
                    talent?.education?
                    <h6>Education</h6>:<></>
                    }
                    {
                    talent?.education?.map( (e, i) => 
                            
                            <li className="card-subtitle mb-2" key={i}>
                            {e.degree}
                            
                            <ul><ul>
                                <li>{e.school}</li>
                                <li><b>Major: </b> {e.major}</li>
                                <li><b>Year: </b> {e.graduate_year}</li>
                            </ul></ul>
                            </li>
                                
                         ) 
                    
                              
                    }

                    <br/>
                    <h6>Training with DS</h6>
                    { 
                        talent?.DStraining?.map( (t, i) => 
                        <div key={i}>

                           

                        {t.trainingName?
                            <li className="card-subtitle mb-2" >{t.trainingName}  - Batch {t.batchNo} - {t.startDate.slice(0, 10)}

                            {/* <ol><b>Courses included:</b>
                            <li></li>
                            </ol> */}
                        </li>:<></>
                        }
                        </div>
                        )
                        // <li className="card-subtitle mb-2" key={i}>{t.trainingName} - Batch {t.batchNo} - {Moment(t.startDate).format('YYYY-MM-DD')}

                    } 

                    <br/>
                    <h6>Skills</h6>
                    <ul id='skills'>
                    { 
                        skills?.map( (skill, i) => 
                        
                            <li key={i}>{skill}</li>
                       
                        )
                    } 
                    </ul>
                    <a href="#" className="card-link">Edit (TBA)</a>
                    <button className="card-link btn-danger" onClick={showDeleteModal}>Delete</button>
                </div>
                </div>
                <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage}  />

            </div>
        )
        :
        <></>
    }
    </>
    

  )
}

export default TalentDetails
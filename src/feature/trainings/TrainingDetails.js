import React, {useState, useEffect, createContext, useContext, useCallback} from 'react';
import { DataContext } from '../../App';
import { useParams } from "react-router-dom";
import axiosTrainings from '../../api/axiosTrainings';
import DeleteConfirmation from '../../components/DeleteConfirmation';
import { Link, useNavigate } from 'react-router-dom';
import { Paginated } from '../../components/PaginatedTable';

// import './trainingDetails.css';
const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: 'Participant Name',
        accessor: 'talentName',
    },
    {
        Header: 'Email',
        accessor: 'email'
    }

]
const TALENT_URL = '';

function TrainingDetails() {
    const {refresh} = useContext(DataContext);
    const [refreshList, setRefreshList] = refresh;

    const navigate = useNavigate();
    const redirecteTo= useCallback((destination) => navigate(destination, {replace: true}), [navigate]);

    const { id } = useParams();

    const [training, setTraining] = useState();

    const getTraining = (()=> {
        axiosTrainings.get(''+`/${id}`, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} }).then((res) => {
          console.log('inside detailed axios get training details')
          console.log(res.data)
          setTraining(res.data);
        })
        .catch ((err) =>{
            console.log(err);
        }); 
      })

    useEffect(() => {
        getTraining();

    },[]);

    useEffect(() => {


    }, [training])

    
    const handleDetails = (id) => {
        console.log('!!!!!^^^^^^^^^^^^!!!!!!!!!!!');
        console.log(id);
        redirecteTo(`../../talents/details/${id}`);
    }

  return (
    <>
    {
        training? (
            <>
            <div className='container'>
                <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{training.trainingName}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">{training.client} </h6>

                    <br/>
                    
                    { 
                    training?.courses?
                    <h6>Courses included:</h6>:<></>
                    }
                    {
                    training?.courses?.map( (e, i) => 
                            
                            <li className="card-subtitle mb-2" key={i}>
                            {e.c_id}
                            

                            </li>
                                
                         ) 
                    
                              
                    }




                    <br/>
                    <h6>Participants</h6>


                    {
                    training?
                    <>
                    <Paginated columns={COLUMNS} data={training.participants} id="participantsTable" clickFunc={handleDetails} />
                    </> :<></>
                    // .participants?.map( (e, i) => 
                            
                    //         <li className="card-subtitle mb-2" key={i}>
                    //         {e.degree}
                            
                    //         <ul><ul>
                    //             <li>{e.id}</li>
                    //             <li><b>Name: </b> {e.talentName}</li>
                    //             <li><b>Email: </b> {e.email}</li>
                    //         </ul></ul>
                    //         </li>
                                
                    //      ) 
                    
                              
                    }

                    {/* <a href="#" className="card-link">Edit (TBA)</a> */}
                    {/* <button className="card-link btn-danger" onClick={showDeleteModal}>Delete</button> */}
                </div>
                </div>
                {/* <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage}  /> */}

            </div>
            </>

        )
        :
        <></>
    }
    </>
    

  )
}

export default TrainingDetails
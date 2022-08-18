import React, {useState, useEffect, createContext, useContext, useCallback} from 'react';
import { DataContext } from '../../App';
import {useTable} from 'react-table';
import Select from "react-select";
// import BasicTable from '../shared/BasicTable';
import { BasicTable } from '../../components/BasicTable';
// import './trainingList.css';
import SearchBar from '../../components/SearchBar';
import { Paginated } from '../../components/PaginatedTable';
import { Link, useNavigate } from 'react-router-dom';
import axiosTrainings from '../../api/axiosTrainings';


const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: 'Training Name',
        accessor: 'trainingName',
        // Cell: ({ original }) => (
        //     <button value={original.name} onClick={() => console.log('details')}>
        //       {original.name}
        //     </button>
        //     )
    },
    {
        Header: 'Client',
        accessor: 'client'
    },
    {
        Header: 'No. Participants',
        accessor: 'NoParticipants'
    },
    {
        Header: 'Start Date',
        accessor: 'startDate'
    },
    {
        Header: 'Rating',
        accessor: 'rating'
    },
    // {
    //     Header: 'DStraining',
    //     // accessor: (originalRow) => {
    //     //     return originalRow.DStraining.traingName;
    //     // }
    //     accessor: 'DStraining.traingName',
    //     Cell: ((row) => (
    //         <p>{row?.values['DStraining.traingName']}</p>
    //       )),
    // }
]
const CLIENTS = ["Vanguard", "NLB", "Training Path", "Tredence", "Pyramid"]
const YEARS = [0, 1, 2, 3, 5]
function TrainingList() {
    // const {trainings} = useContext(DataContext);
    // const [trainingList, setTrainingList] = trainings;
    const [trainingList, setTrainingList] = useState();
    const [filteredTrainings, setFilteredTrainings] = useState();
    const [showTrainings, setShowTrainings] = useState();
    const [client, setClient] = useState([]);
    const [selectedYear, setSelectedYear] = useState("none");


    const navigate = useNavigate();
    const redirecteTo= useCallback((destination) => navigate(destination, {replace: true}), [navigate]);

    useEffect(() => {
        getTrainings();
        // console.log(trainingList);
        setFilteredTrainings(trainingList);
        setShowTrainings(trainingList);
    }, [trainingList])


    const getTrainings = async () => {
        try {
            const resp = await axiosTrainings.get('', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
            // console.log(resp.data);
            const list = resp.data.sort((a, b) => a.id > b.id)
            setTrainingList(list);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    const onSearchSubmit = term => {
        console.log('--------------')
        console.log('New Search submit', term.toLowerCase()); 

        let filter = term.toLowerCase();
        var rows = document.querySelector("#trainingsTable tbody").rows;

        for (var i = 0; i < rows.length; i++) {
            var Col_2 = rows[i].cells[1].textContent.toLowerCase();
            var Col_3 = rows[i].cells[2].textContent.toLowerCase();
            var Col_4 = rows[i].cells[3].textContent.toLowerCase();
            var Col_5 = rows[i].cells[4].textContent.toLowerCase();

            if (Col_2.indexOf(filter) > -1 || Col_3.indexOf(filter) > -1 || Col_4.indexOf(filter) > -1 || Col_5.indexOf(filter) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }      
        }
        // var firstName = 
        // let filtered_trainings = trainingList.filter((val) => val.skills.toLowerCase().includes(filter));
        // setFilteredTrainings(filtered_trainings);
        // setShowTrainings(filtered_trainings);
      }

    const clearResults = () => setShowTrainings(TrainingList);

    const onYearSelected = e => {
        setSelectedYear(e.value)
        // console.log(e.target.value)
    }

    const handleDetails = (id) => {
        
        console.log(id);

        redirecteTo(`details/${id}`);
    }

  return (
    <>
    <div className='container'>
        <div className='row'>

            <div className='col-lg-3 col-md-12'>
            <br /><br />
                <h5>Search with anything:</h5>
                <SearchBar onSearchSubmit={term => onSearchSubmit(term)} clearResults={clearResults}/>
                
               {/* <br /><h5>Years of Ex</h5>
                <div>
                <Select
                    options={YEARS}
                    onChange={onYearSelected}
                    value={YEARS.filter(function(option) {
                    return option === selectedYear;
                    })}
                    label="Single select"
                />
                </div> */}
                {/* <br /><br />
                <h5>Clients</h5>

                {
                    CLIENTS.map((client, i) => 
                    <div key={i}>
                        <label className="container">{client}
                        <input className='checkbox' type="checkbox"/>
                        <span className="checkmark"></span>
                        </label>
                    </div>
                    )
                } */}

                {/* <label className="container">Vanguard
                <input className='checkbox' type="checkbox"/>
                <span className="checkmark"></span>
                </label>
                <label className="container">Training Path
                <input className='checkbox' type="checkbox"/>
                <span className="checkmark"></span>
                </label>
                <label className="container">Pyramid
                <input className='checkbox' type="checkbox"/>
                <span className="checkmark"></span>
                </label>
                <label className="container">NLB
                <input className='checkbox' type="checkbox"/>
                <span className="checkmark"></span>
                </label>
                <label className="container">Tredence
                <input className='checkbox' type="checkbox"/>
                <span className="checkmark"></span>
                </label> */}
                    
                
                
                <br /><br />
                
                {/* <h5>Expertises</h5>
                <label className="container">Frontend
                <input className='checkbox' type="checkbox"/>
                <span className="checkmark"></span>
                </label>
                <label className="container">Backend
                <input className='checkbox' type="checkbox"/>
                <span className="checkmark"></span>
                </label>
                <label className="container">Data Analytics
                <input className='checkbox' type="checkbox"/>
                <span className="checkmark"></span>
                </label>
                <label className="container">Cloud
                <input className='checkbox' type="checkbox"/>
                <span className="checkmark"></span>
                </label>
                <label className="container">DevOps
                <input className='checkbox' type="checkbox"/>
                <span className="checkmark"></span>
                </label> */}




            </div>


            <div className='col-lg-9 col-md-12'>
                <h4>Training List</h4>
                { showTrainings?
                    <div className="App">
                   
                    <Paginated columns={COLUMNS} data={showTrainings} id="trainingsTable" clickFunc={handleDetails} />
                    {/* <BasicTable columns={COLUMNS} data={trainingList} /> */}
                    </div>
                    :
                    <></>
                }


                
            </div>

        </div>

    </div>

    </>
  )
}

export default TrainingList
import React, {useState, useEffect, createContext, useContext, useCallback} from 'react';
import { DataContext } from '../../App';
import {useTable} from 'react-table';
import Select from "react-select";
// import BasicTable from '../shared/BasicTable';
import { BasicTable } from '../../components/BasicTable';
import './talentList.css';
import SearchBar from '../../components/SearchBar';
import { Paginated } from '../../components/PaginatedTable';
import { Link, useNavigate } from 'react-router-dom';

import axiosTalents from '../../api/axiosTalents';
import axiosTrainings from '../../api/axiosTrainings';


const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: 'Name',
        accessor: 'talentName',
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
        Header: 'Position',
        accessor: 'title'
    },
    {
        Header: 'Skills',
        accessor: 'skills'
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
const CLIENTS = ["Vanguard", "NLB", "Talent Path", "Tredence", "Pyramid"]
const TECHS = ["Angular", "React", "Python", "Flask", "Kubernetes", "DA with Python"]
const YEARS = [0, 1, 2, 3, 5]
function TalentList() {
    const {roles, talents} = useContext(DataContext);
    const [talentList, setTalentList] = talents;
    const [talentNum, setTalentNum] = useState(0);
    const [filteredTalents, setFilteredTalents] = useState();
    const [showTalents, setShowTalents] = useState();
    const [client, setClient] = useState([]);
    const [selectedYear, setSelectedYear] = useState("none");

    const [userRole, setRoles] = roles;


    const navigate = useNavigate();
    const redirecteTo= useCallback((destination) => navigate(destination, {replace: true}), [navigate]);

    useEffect(() => {
        console.log(talentList);
        getTalents();
        setFilteredTalents(talentList);
        setShowTalents(talentList);
    }, [talentList])

    const getTalents = async () => {
        try {
            const resp = await axiosTalents.get('', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
            console.log(resp.data);
            setTalentList(resp.data);
            setTalentNum(resp.data.length);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    const onSearchSubmit = term => {
        console.log('--------------')
        console.log('New Search submit', term.toLowerCase()); 

        let filter = term.toLowerCase();
        var rows = document.querySelector("#clientsTable tbody").rows;

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
        // let filtered_talents = talentList.filter((val) => val.skills.toLowerCase().includes(filter));
        // setFilteredTalents(filtered_talents);
        // setShowTalents(filtered_talents);
      }

    const clearResults = () => setShowTalents(TalentList);

    const onYearSelected = e => {
        setSelectedYear(e.value)
        // console.log(e.target.value)
    }

    const handleDetails = (id) => {
        console.log(id);
        redirecteTo(`details/${id}`);
    }

    const routeChangetoAdd = () =>{ 
        let path = `/talents/add`; 
        navigate(path);
      }

  return (
    <>
    <div className='container'>
        <div className='row'>

            <div className='col-lg-3 col-md-12'>
            <br /><br />
                <h6>Search with anything:</h6>
                <SearchBar onSearchSubmit={term => onSearchSubmit(term)} clearResults={clearResults}/>

                <br /><br />

                {
                    localStorage.getItem('roles') && (localStorage.getItem('roles').indexOf('5150') != -1 || localStorage.getItem('roles').indexOf('1984'))?
                    <>
                    <button className='btn btn-primary' onClick={routeChangetoAdd}>Add a talent</button>
                    </>:
                    <>
                    </>

                }
{/* 
                <h6>Filtering by DStrainings:</h6>
                {
                    TECHS.map((training, i) => 
                    <div key={i}>
                        <label className="container">{training}
                        <input className='checkbox' type="checkbox" 
                            name={training} 
                            value={training}
                            
                                />
                        <span className="checkmark"></span>
                        </label>
                    </div>
                    )
                } */}

                
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
                <label className="container">Talent Path
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
                <h4>Talent List</h4>

                <p>Found {talentNum} talents</p>
                { showTalents?
                    <div className="App">
                   
                    <Paginated columns={COLUMNS} data={showTalents} id="clientsTable" clickFunc={handleDetails} />
                    {/* <BasicTable columns={COLUMNS} data={talentList} /> */}
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

export default TalentList
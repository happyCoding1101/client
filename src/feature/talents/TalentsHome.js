import React, {useState, useEffect, createContext, useContext} from 'react'
import {Routes, Route, Link} from 'react-router-dom';
import AddTalent from './AddTalent';
import TalentDetails from './TalentDetails';
import TalentList from './TalentList';
// import UpdateTalent from './UpdateTalent';

function TalentsHome() {
  return (
    <>
    {/* <h1>This is Talent Homepage</h1> */}
        {/* <Link to='' className='btn'>TalentList</Link> */}

        {/* <Link to='add' className='btn'>Add</Link> */}
        
        <Routes>
            <Route path="/" element={<TalentList />} />
            <Route path="add" element={<AddTalent/>} />
            <Route path='details/:id' element={<TalentDetails />} />
            {/* <Route path='update/:id' element={<UpdateTalent />} /> */}
        </Routes>
    </>
  )
}

export default TalentsHome
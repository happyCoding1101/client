import React, {useState, useEffect, createContext, useContext} from 'react'
import {Routes, Route, Link} from 'react-router-dom';
import TrainingDetails from './TrainingDetails';
import TrainingList from './TrainingList';
// import AddTraining from './AddTraining';
// import TrainingDetails from './TrainingDetails';

// import UpdateTraining from './UpdateTraining';

function TrainingsHome() {
  return (
    <>
    {/* <h1>This is Training Homepage</h1> */}
        {/* <Link to='' className='btn'>TrainingList</Link> */}

        {/* <Link to='add' className='btn'>Add</Link> */}
        
        <Routes>
            <Route path="/" element={<TrainingList />} />
            {/* <Route path="add" element={<AddTraining/>} /> */}
            <Route path='details/:id' element={<TrainingDetails />} />
            {/* <Route path='update/:id' element={<UpdateTraining />} /> */}
        </Routes>
    </>
  )
}

export default TrainingsHome
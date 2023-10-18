import { getAllPatients } from "../controllers/patientsController";

import React from 'react'

const Main = () => {
    const amizero= getAllPatients().findById("652ee15d7adfc0025513e9e2")
  return (
    <div>
        <h1>{amizero.username}</h1>
    </div>
  )
}

export default Main


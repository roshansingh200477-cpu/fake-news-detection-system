import React, { useContext } from 'react'
import NewsForm from '../components/NewsForm'
import PredictionResult from '../components/PredictionResult'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const DetectNews = () => {
  const { user } = useContext(AuthContext);

  if(!user){
    return <Navigate to="/SignUp" />
  }
  return (
    <div>
      <NewsForm />
      <PredictionResult />
    </div>
  )
}

export default DetectNews

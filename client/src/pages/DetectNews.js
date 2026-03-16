import React, { useContext } from 'react'
import NewsForm from '../components/NewsForm'
import PredictionResult from '../components/PredictionResult'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const DetectNews = () => {
  const { user, loading } = useContext(AuthContext);

  if(loading) return null;

  if(!user){
    return <Navigate to="/Login" />
  }
  return (
    <div>
      <NewsForm />
      <PredictionResult />
    </div>
  )
}

export default DetectNews

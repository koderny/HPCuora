import React from 'react'
import CreateQuestion from '../CreateQuestion/CreateQuestion'
import AllQuestions from '../AllQuestions'
import './HomePage.css'

const HomePage = () => {
  return (
    <div id='home-page'>
        <CreateQuestion/>
        <AllQuestions/>

    </div>
  )
}

export default HomePage
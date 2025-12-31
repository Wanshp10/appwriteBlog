import { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import './App.css'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import {login, logout} from './store/authSlice'
import { Header, Footer } from './component/index.js'

// npm i @reduxjs/toolkit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form

// Environment variables
// If we are storing using client id's, password in react what will happen is at the end of the day react is an frontend library whatever return here is shifted to browser through javascript which can be accessed by anyone which is not a good practice so we make system variables 
// Such environment variables are stored in ".env" which should be in the root of the project and it should be also added in gitIgnore because we never shift enironment variables on github

// Now we also want this .env file so we shift all this values it also has same variables as that of .env the change is that values are empty

// There are different ways of accessing this .env file for backend and frontend here we are using 
// process.env.(name of that variable)
// Everytime we make changes in the .env file we have to rerun the file

function App() {
  // console.log(Process.env.REACT_APP_APPWRITE_URL)
  // The above way is also correct but it is correct for project created through app create and not vite react 

  // console.log(import.meta.env.VITE_APPWRITE_URL)
  // Fetching value like this is not a good pratice bcoz sometimes it may not load and bcoz of which our site may get crash so its better t to import all this in one file already named conf this file should be inside folder that folder should be in src only

  // Now our next part is to make services which are to be given by appwrite so we make folder appwrite and put everything related appwrite there

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect (() => {
    authService.getCurrentUser().then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    }).finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className='w-full block'>
        <Header />
        <main>
          TODO: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App

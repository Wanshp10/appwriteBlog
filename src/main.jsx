import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayoutProtection, Login } from './component/index.js'

import AddPost from "./pages/AddPost";
import SignUp from './pages/Signup'
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayoutProtection authentication={false}>
                    <Login />
                </AuthLayoutProtection>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayoutProtection authentication={false}>
                    <SignUp />
                </AuthLayoutProtection>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayoutProtection authentication>
                    {" "}
                    <AllPosts />
                </AuthLayoutProtection>
            ),
        },
        {
            path: "/add-posts",
            element: (
                <AuthLayoutProtection authentication>
                    {" "}
                    <AddPost />
                </AuthLayoutProtection>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayoutProtection authentication>
                    {" "}
                    <EditPost />
                </AuthLayoutProtection>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
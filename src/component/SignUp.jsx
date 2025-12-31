import React from 'react'
import { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import {Button} from './index.js'
import {Input} from './index.js'
import {Logo} from './index.js'
import { useForm } from 'react-hook-form'

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData) {
                const currentUser = await authService.getCurrentUser()
                if(currentUser) {
                    dispatch(login(currentUser))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
         <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign in to your account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input 
                            label="Fill Name: "
                            type="text"
                            placeholder='Enter your full name'
                            {...register("name", {
                                required: true,
                            })} 
                        />
                    </div>

                    <div className='space-y-5'>
                        <Input 
                            label="Email: "
                            type="email"
                            placeholder='Enter your email'
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address"
                                }
                            })} 
                        />
                    </div>

                    <div className='space-y-5'>
                        <Input 
                            label="Password: "
                            type="password"
                            placeholder='Enter your password'
                            {...register("password", {
                                required: true,
                            })} 
                        />
                    </div>

                    <Button type="submit" className="w-full">Create Account</Button>
                </form>
            </div>
        </div>
    )
}

export default SignUp

import React, { useState } from 'react'
import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";

const SignUp = (props) => {
    const [email, setEmail] = useState("");
    const [emailAlreadyInUsed, setEmailAlreadyInUsed] = useState(false);
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [validPassword, setValidPassword] = useState(true)
const [isLoading , setIsLoading] = useState(false)
    

    const addUserName = async () => {
        
        try {
            updateProfile(auth.currentUser, {
                displayName: name
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    const signup = async () => {
        setIsLoading(true)
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            await addUserName();
        }
        catch (error) {
            setEmailAlreadyInUsed(true)
            console.log(error.message);
        }
        setIsLoading(false);
    }

    const signUpHandler = (event) => {
        event.preventDefault();
        if(validPassword){
            signup();
        }
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
        setTimeout(() => {
            if(e.target.value < 6){
                setValidPassword(false)
            }
            
        }, 2000);
        e.target.value.length >= 6 && setValidPassword(true)
    }

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className=" bg-white w-96 rounded-2xl">
                <div className="flex flex-col justify-center px-6 py-12 lg:px-8 ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create Your Account
                        </h2>
                    </div>

                    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-5" onSubmit={signUpHandler}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {emailAlreadyInUsed && <p className='text-red-600'>Already account is registered with this email</p>}
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={passwordChangeHandler}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {!validPassword && <p className='text-red-600'>Password should be atleast 6 characters</p>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {isLoading ? "Processing..." : "Sign up"}
                                </button>
                            </div>
                        </form>
                        <div className="flex items-center justify-center mt-2">
                            <div className="text-sm">
                                <span className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={props.isUserAlreadyHaveAccount}>
                                    Already have account?
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;

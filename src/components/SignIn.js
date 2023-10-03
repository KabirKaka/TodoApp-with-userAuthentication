import React, { Fragment, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import ResetPassword from './ResetPassword';

const SignIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async () => {
        setIsLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
        }
        catch (error) {
            setInvalidCredentials(true)
        }
        setIsLoading(false)
    }

    const resetPassword = () => {
        setShowResetPassword(prevState => !prevState)
    }

    const signInHandler = (event) => {
        event.preventDefault();
        signIn();
    }


    return (
        <Fragment>
            {showResetPassword && <ResetPassword getBackToSignIn={resetPassword} />}
            {!showResetPassword && <div className="h-screen w-full flex justify-center items-center">
                <div className=" bg-white w-96 rounded-2xl">
                    <div className="flex   flex-col justify-center px-6 py-12 lg:px-8 ">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={signInHandler}>
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
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <span className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={resetPassword}>
                                                Forgot password?
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {invalidCredentials && <p className='text-red-600'>Invalid Email/Password</p>}
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {isLoading ? "Processing..." : "Sign in"}
                                    </button>
                                </div>
                            </form>
                            <div className="flex items-center justify-center mt-2">
                                <div className="text-sm">
                                    <span className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={props.switchToSignUp}>
                                        Create a new account
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </Fragment>
    )
}

export default SignIn;

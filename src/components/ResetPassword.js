import React, { Fragment, useState } from 'react'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase"

const ResetPassword = (props) => {
    const [email, setEmail] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);

    const resetPasswordByEmail = async () => {
        try {
            await sendPasswordResetEmail(auth, email)
            setIsEmailSent(true)
        }
        catch (error) {
            console.log(error)
        }
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        resetPasswordByEmail();
    }

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className=" bg-white w-96 rounded-2xl">
                <div className="flex flex-col justify-center px-6 py-12 lg:px-8 ">

                    {isEmailSent &&
                        <div>
                            <h1 className='text-center text-xl'>Email Sent successfully</h1>
                            <div>
                                <button
                                    onClick={props.getBackToSignIn}
                                    className="flex w-auto m-auto my-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Go Back to SignIn page
                                </button>
                            </div>
                        </div>
                    }
                    {!isEmailSent &&
                        <Fragment>
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Reset Your Password
                                </h2>
                            </div>

                            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-5" onSubmit={formSubmitHandler}>
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
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Send Email
                                        </button>
                                    </div>
                                </form>

                                <div className="flex items-center justify-center mt-2">
                                    <div className="text-sm">
                                        <span onClick={props.getBackToSignIn} className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                            Go Back to SignIn page
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Fragment>}
                </div>
            </div>
        </div>
    )
}

export default ResetPassword

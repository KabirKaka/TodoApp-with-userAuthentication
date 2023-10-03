import React, { Fragment } from 'react'
import { auth } from "../firebase"
import { signOut } from "firebase/auth";


const Navbar = ({switchToSignIn}) => {
    let userName = auth.currentUser.displayName;
    if (userName !== null) {
        if (userName.includes(" ")) {
            userName = userName.split(" ")[0]
        }
    }

    const signOutHandler = async () => {
        const signout = await signOut(auth)
        switchToSignIn()
        if (signout) {
            console.log("successfully signOut")
        }
    }

    return (
        <Fragment>
            <nav className='bg-blue-300 flex justify-around items-center h-14 '>
                <h1 className='text-2xl font-bold'>MyTodos</h1>
                <div className='flex justify-center items-center font-bold'>
                    <h2 className=''>Hi, {userName} </h2>
                    <button
                        onClick={signOutHandler}
                        className="flex w-30 justify-center rounded-xl bg-indigo-600 ml-2 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        SignOut
                    </button>
                </div>
            </nav>
        </Fragment>
    )
}

export default Navbar;

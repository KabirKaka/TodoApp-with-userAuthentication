import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {db,auth} from "../../firebase"

function TodoForm() {
    const [todoText, setTodoText] = useState("")
    const userEmail = auth.currentUser.email

    const storeData = async () => {
        try {
            await addDoc(collection(db, "todoList"), {
                text: todoText,
                createdAt : serverTimestamp(),
                email: userEmail

            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        await storeData()
        setTodoText("")
    }

    return (
        <div className="h-full w-full flex justify-center mx-auto my-4">
            <div className=" bg-blue-300 w-auto rounded-2xl">
                <div className="flex flex-col justify-center px-6 py-4 lg:px-8 shadow-2xl">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Add Todo
                        </h2>
                    </div>

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-5" onSubmit={formSubmitHandler}>
                            <div>
                                <div className="mt-2">
                                    <input
                                        type='text'
                                        placeholder='Add a new todo'
                                        value={todoText}
                                        onChange={e => setTodoText(e.target.value)}
                                        className="block w-72 sm:w-96 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                                        focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className='flex justify-end'>
                                <button
                                    type="submit"
                                    className="flex w-24 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoForm

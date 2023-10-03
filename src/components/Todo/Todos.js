import React, { Fragment, useCallback, useEffect, useState } from 'react'
import Navbar from '../Navbar'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import { db, auth } from "../../firebase"
import { collection, query, onSnapshot, orderBy, limit } from "firebase/firestore";

const Todos = (props) => {
    const [todoList, setTodoList] = useState([])
    const userEmail = auth.currentUser.email

    const getData = useCallback( () => {
        const q = query(collection(db, "todoList"), orderBy("createdAt"), limit(20));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            const currentUserTodos = list.filter(todo => todo.email === userEmail)
            setTodoList(currentUserTodos);
        });

        return unsubscribe;
    },[userEmail])

    useEffect(() => {
        const unsubscribe = getData();
        return () => unsubscribe();
    }, [getData])

    return (
        <Fragment>
            <Navbar switchToSignIn = {props.switchToSignIn} />
            <TodoForm />
            <ul className='w-full flex flex-col justify-between items-center'>
                {todoList.map((todo) => (
                    <TodoItem key={todo.id} data={todo} />
                ))}
            </ul>
        </Fragment>
    )
}

export default Todos;

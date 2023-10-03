import { doc, deleteDoc } from "firebase/firestore";
import icon from "../../assets/icon/xmark-solid.svg"
import {db} from "../../firebase"

function TodoItem({data}) {

    const deleteTodo = async () => {
        try{
            await deleteDoc(doc(db, "todoList",data.id));
        }
        catch(e){
            console.error("Error removing document: ", e);
        }
    }

    return (
        <li className="my-2  bg-blue-300 rounded-2xl p-6 mx-6 w-auto">
            <div className=' flex justify-between items-center'>
                <p className='text-xl w-64 sm:w-96 '>{data.text}</p>
                <div className='w-fit ml-1'>
                    <img src={icon} className="w-4 cursor-pointer hover:color-blue-600" alt='X' onClick={deleteTodo} />
                </div>
            </div>
        </li>
    )
}

export default TodoItem;

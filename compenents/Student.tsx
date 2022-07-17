import { useContext } from "react";
import { ACTION_TYPES, StudentDispatch } from "./Todo"


type Stuprops={
  name:string,
  id:number,
  isHere:boolean
}


const Student = ({name,id,isHere}:Stuprops) => {
  const dispatch = useContext(StudentDispatch);
  return (
    <div>
        <span style={{
          textDecoration:isHere? "line-through": "none",
          color : isHere ? "gray" :"black"
        }}
        onClick={()=>{
          dispatch({type:ACTION_TYPES.markstudent,payload:{id}})
        }}>{name}</span>
        <button onClick={()=>{
          dispatch({type:ACTION_TYPES.deletestudent,payload:{id}})
        }}>삭제</button>
    </div>
  )
}

export default Student
import { createContext, useEffect, useReducer, useState } from "react";
import Student from "./Student";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

// type Std = {
//   id: number;
//   name: string;
//   isHere: boolean;
// };
export type User = {
  id: string;
  name: string;
  age: number;
};

// export const ACTION_TYPES = {
//   addstudent: "add-student",
//   deletestudent: "delete-student",
//   markstudent: "mark-student",
// };
// type State = {
//   count: number;
//   students: Std[];
// };

// const reducer = (state: State, action: any): any => {
//   switch (action.type) {
//     case ACTION_TYPES.addstudent:
//       const name = action.payload.name;
//       const newStudent: Std = {
//         id: Date.now(),
//         name,
//         isHere: false,
//       };
//       return {
//         count: state.count + 1,
//         students: [...state.students, newStudent],
//       };
//     case ACTION_TYPES.deletestudent:
//       return {
//         count: state.count - 1,
//         students: state.students.filter(
//           (student) => student.id !== action.payload.id
//         ),
//       };
//     case ACTION_TYPES.markstudent:
//       return {
//         count: state.count,
//         students: state.students.map((student) => {
//           if (student.id === action.payload.id) {
//             return { ...student, isHere: !student.isHere };
//           }
//           return student;
//         }),
//       };
//     default:
//       return state;
//   }
// };

// const initialState = {
//   count: 0,
//  students: [],
// };

//export const StudentDispatch = createContext<any>(null);
const initialState = {
  //persons: persons,
  users: [],
};
const usersCollectionRef = collection(db, "users");

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "UPDATE":
      // console.log("업데이트 진입");
      // console.log("state : ", state);
      // console.log("action.payload : ", action.payload);
      // state = action.payload;
      return { ...action.payload }; //...state,
    default:
      return state;
  }
};
function Todo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [users, setUsers] = useState<User[]>([]);
  let users = [];
  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    if (data !== null) {
      data.docs.map((doc) => {
        let result = {
          id: doc.id,
          name: doc.data().name,
          age: doc.data().age,
        };
        // setUsers((users) => [...users, result]);
        users = [...users, result];
      });
      dispatch({ type: "UPDATE", payload: users });
    }
  };

  // if (localStorage.getItem("carts") !== null) {
  //   const fetchedCarts = JSON.parse(localStorage.getItem("carts"));
  //   dispatch({ type: 'UPDATE', payload: fetchedCarts })
  // }
  // const [name, setName] = useState("");
  // const [users, setUsers] = useState<User[]>([]);
  // const [studentsInfo, dispatch] = useReducer(reducer, initialState);

  // const getUsers = async () => {
  //   const data = await getDocs(usersCollectionRef);
  //   //data.docs에는 doc들이 들어있다.
  //   data.docs.map((doc) => {
  //     let result = {
  //       id: doc.id,
  //       name: doc.data().name,
  //       age: doc.data().age,
  //     };
  //     setUsers((users) => [...users, result]);
  //   });
  // };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {users.map((item, index) => {
        return (
          <div key={item.id}>
            {item.name} {item.age}
          </div>
        );
      })}
      {/* {state.map((item, index) => {
        return (
          <div key={item.id}>
            {index}
            {item.name} {item.age}
          </div>
        );
      })} */}
      <button
        onClick={() => {
          //dispatch({ type: "UPDATE", payload: users });
          // console.log("users : ", users);
          console.log("state : ", state);
        }}
      >
        check state
      </button>
    </>
    // <StudentDispatch.Provider value={dispatch}>
    //   <h1>출석부</h1>
    //   <p>총 학생 수: {studentsInfo.count}</p>
    //   <input
    //     type="text"
    //     placeholder="이름을 입력해주세요"
    //     value={name}
    //     onChange={(e) => {
    //       setName(e.target.value);
    //     }}
    //   />
    //   <button
    //     onClick={() => {
    //       dispatch({ type: ACTION_TYPES.addstudent, payload: { name } });
    //     }}
    //   >
    //     추가
    //   </button>
    //   {studentsInfo.students.map((student: Std) => {
    //     return (
    //       <Student
    //         key={String(student.id)}
    //         name={student.name}
    //         id={student.id}
    //         isHere={student.isHere}
    //       ></Student>
    //     );
    //   })}
    // </StudentDispatch.Provider>
  );
}

export default Todo;

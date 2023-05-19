import { useEffect, useState } from "react";
import instance from "../apiAxios.config";
import { useParams } from "react-router";

function User() {
  const { id } = useParams();
  const [dataUser, setDataUser] = useState([]);
  const [changeUser, setChangeUser] = useState([]);
  const [showInput, setShowInput] = useState(1);
  const [User1, setUser1] = useState();
  const [User2, setUser2] = useState();
  const [User3, setUser3] = useState();
  const [User4, setUser4] = useState();

console.log(showInput)
  useEffect(() => {
    const fetch = async () => {
      const data = await instance.get(`/round/${id}`);
      setDataUser(data.data);
    };
    fetch();
  }, []);

  const handleChange = (e, index) => {
    const newUser = [...changeUser];
    if (!newUser[index]) {
      newUser[index] = e.target.value;
    } else {
      newUser[index] = e.target.value;
    }
    setChangeUser(newUser);
  };

  const handleAdd = () => {
    const relst = instance.post(`/round/${id}`, changeUser);
    console.log(relst);
  };

  const handleAddUser =()=>{
    setShowInput(showInput+1)
  }
  
  const handleVo = ()=>{
    setChangeUser([User1,User2,User3,User4])
  }

  console.log(changeUser)

  return (
    <>
      <h1 className="text-5xl">Pick User</h1>
      {dataUser.username ? (
        <div>
        {dataUser.username.map((item, index) => (
          <div key={index}>
            <label className="block text-gray-700 text-sm font-bold mb-2"></label>
            <input
              placeholder={item}
              onChange={(e) => handleChange(e, index)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
            />
          </div>
        ))}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAdd}>Add</button>
        </div>
      ) : (
        <div className="flex flex-col gap-5 mt-10 w-2/3 mx-auto">
          <input onClick={(e)=>setUser1(e.target.value)} className="outline rounded py-1" />
          {showInput>=2?<input onClick={(e)=>setUser2(e.target.value)} className="outline rounded py-1 " />:<></>}
          {showInput>=3?<input onClick={(e)=>setUser3(e.target.value)} className="outline rounded py-1 " />:<></>}
          {showInput>=4?<input onClick={(e)=>setUser4(e.target.value)} className="outline rounded py-1 " />:<></>}
          {showInput>=5?<span  className="text-red-700 text-lg">Tối đa 4 người </span>:<></>}
          <div className="flex w-full justify-around">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddUser}>Add user</button>
            <button className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleVo}>vô</button>
          </div>
        </div>
      )}
      
    </>
  );
}

export default User;

import { useEffect, useState } from "react";
import instance from "../apiAxios.config";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

function User() {
  const { id } = useParams();
  const [dataUser, setDataUser] = useState([]);
  const [changeUser, setChangeUser] = useState([]);
  const [showInput, setShowInput] = useState(1);
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [user3, setUser3] = useState("");
  const [user4, setUser4] = useState("");
  

  useEffect(() => {
    const fetch = async () => {
      const data = await instance.get(`/${id}`);
      setDataUser(data.data);
    };
    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e, index) => {
    let newUser = [...changeUser];
    if (!newUser[index]) {
      newUser[index] = e.target.value;
    } else {
      newUser[index] = e.target.value;
    }
    setChangeUser(newUser);
  };


  const handleAddUser = () => {
    setShowInput(showInput + 1);
  };
  useEffect(()=>{
    let arr=[user1, user2, user3, user4]
    setChangeUser(arr);
  },[user1, user2, user3, user4])
  
  const handleVo = () => {
    instance.post(`/round/${id}`, changeUser);
  };
    return (
    <>
        <Link className="fixed top-0 left-0 flex items-center hover:text-red-700" to={`/`}><BiArrowBack/>Home</Link>

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
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleVo}
          >
            Add
          </button>
          <Link
            to={`/round/${id}/detail`}
            className=" ml-5 bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Vô
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5 mt-10 w-2/3 mx-auto">
          <input
            onChange={(e) => setUser1(e.target.value)}
            className="outline rounded py-1"
          />
          {showInput >= 2 ? (
            <input
              onChange={(e) => setUser2(e.target.value)}
              className="outline rounded py-1 "
            />
          ) : (
            <></>
          )}
          {showInput >= 3 ? (
            <input
              onChange={(e) => setUser3(e.target.value)}
              className="outline rounded py-1 "
            />
          ) : (
            <></>
          )}
          {showInput >= 4 ? (
            <input
              onChange={(e) => setUser4(e.target.value)}
              className="outline rounded py-1"
            />
          ) : (
            <></>
          )}
          {showInput >= 5 ? (
            <span className="text-red-700 text-lg">Tối đa 4 người </span>
          ) : (
            <></>
          )}
          <div className="flex w-full justify-around">
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddUser}
            >
              Add user
            </button>
            <Link
              to={`/round/${id}/detail`}
              className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleVo}
            >
              vô
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default User;

import { useEffect, useState } from "react";
import instance from "../apiAxios.config";
import { Link } from "react-router-dom";


function Home() {
  const [dataGame, setDataGame] = useState([]);
  const [gameName, setGameName] = useState();

  useEffect(() => {
    const fetch = async () => {
      const data = await instance.get("/");
      setDataGame(data.data);
    };
    fetch();
  }, [dataGame]);
  const handleAdd = () => {
    instance.post("/", { gameName });
    setGameName("");
  };

  const handleDel =(item)=>{
    instance.post("/deletegame",  item )
  }

  return (
    <>
      <h1 className="text-5xl">Pick Game</h1>
      <div className="my-10">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Add Game Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={gameName}
          placeholder="Add Game Name"
          onChange={(e) => setGameName(e.target.value)}
        ></input>
        <button className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAdd}>Add</button>
      </div>

      {dataGame?.map((item, index) => (
        <div className="flex" key={index}>
          <Link className="mt-3" to={`/${item.gameID}`}>
            <button className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {item.gameName}
            </button>
          </Link>
          <button onClick={()=>handleDel(item)} className="bg-red-500 hover:bg-red-700 text-white text-sm mt-3 ml-3 px-3 rounded">X</button>
        </div>
      ))}
    </>
  );
}

export default Home;

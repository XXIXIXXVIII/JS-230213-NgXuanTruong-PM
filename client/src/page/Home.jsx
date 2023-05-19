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
const handleAdd = ()=>{
  let result = instance.post('/', {gameName })
  setGameName("")
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
          onChange={(e)=>setGameName(e.target.value)}
        ></input>
        <button onClick={handleAdd}>Add</button>
      </div>

      {dataGame?.map((item, index) => (
        <div key={index}>
          <Link to={`/${item.gameID}`}>
            <button className="rounded bg-red-500 mt-5">{item.gameName}</button>
          </Link>
        </div>
      ))}
    </>
  );
}

export default Home;

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import instance from "../apiAxios.config";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

function RoundDetail() {
  const { id } = useParams();
  const [dataUser, setDataUser] = useState([]);
  const [sumUser1, setSumUser1] = useState(0);
  const [sumUser2, setSumUser2] = useState(0);
  const [sumUser3, setSumUser3] = useState(0);
  const [sumUser4, setSumUser4] = useState(0);
  const [userAll, setUserAll] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const data = await instance.get(`/round/${id}`);
      setDataUser(data.data);
    };
    fetch();
  }, [id]);

  useEffect(() => {
    const columnSumUser1 = dataUser?.round?.reduce((accumulator, item) => {
      return accumulator + item[0];
    }, 0);
    setSumUser1(columnSumUser1);

    const columnSumUser2 = dataUser?.round?.reduce((accumulator, item) => {
      return accumulator + item[1];
    }, 0);
    setSumUser2(columnSumUser2);

    const columnSumUser3 = dataUser?.round?.reduce((accumulator, item) => {
      return accumulator + item[2];
    }, 0);
    setSumUser3(columnSumUser3);

    const columnSumUser4 = dataUser?.round?.reduce((accumulator, item) => {
      return accumulator + item[3];
    }, 0);
    setSumUser4(columnSumUser4);

    setUserAll(
      columnSumUser1 + columnSumUser2 + columnSumUser3 + columnSumUser4
    );
  }, [dataUser]);

  const handleChange = (value, indexRow, indexColum) => {
    const newDataUser = { ...dataUser };
    newDataUser.round[indexRow][indexColum] = +value;
    setDataUser(newDataUser);
    instance.post("/round/updateround", { newDataUser });
  };

  const addRound = () => {
    const newDataUser = { ...dataUser };
    console.log("2");
    // eslint-disable-next-line no-unused-vars
    newDataUser.round.push(dataUser.username.map((item) => 0));
    setDataUser(newDataUser);
    instance.post("/round/updateround", { newDataUser });
  };

  const handleDelRound = (indexRow) => {
    const newDataUser = { ...dataUser };
    newDataUser.round.splice(indexRow, 1);
    console.log(newDataUser.round);
    setDataUser(newDataUser);
    // instance.post("/round/delete",{indexRow, id})
  };

  console.log(dataUser.round);
  return (
    <div>
      <Link
        className="fixed top-0 left-0 flex items-center hover:text-red-700"
        to={`/${id}`}
      >
        <BiArrowBack />
        Back
      </Link>
      <table className="border-collapse border border-slate-500 w-[90%]">
        <thead className="bg-gray-500">
          <tr>
            <th className="border border-slate-600">#</th>
            {dataUser?.username?.map((item, index) => (
              <th key={index} className="border w-1/5 border-slate-600">
                {item}
              </th>
            ))}
            <th className="border border-slate-600">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-blue-400 ">
            <td>Sum of scores ({userAll})</td>
            <td>{sumUser1}</td>
            <td>{sumUser2}</td>
            <td>{sumUser3}</td>
            <td>{sumUser4}</td>
            <td></td>
          </tr>
          {dataUser?.round?.map((item, indexRow) => {
            return (
              <tr key={indexRow}>
                <td>Route {indexRow + 1}</td>
                {item.map((item, indexColum) => (
                  <td key={indexColum}>
                    <input
                      onChange={(e) =>
                        handleChange(e.target.value, indexRow, indexColum)
                      }
                      defaultValue={item}
                      type="number"
                      className="bg-gray-50 border w-[80%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    />
                  </td>
                ))}
                <td>
                  <button
                    onClick={() => handleDelRound(indexRow)}
                    className="bg-red-500 hover:bg-red-700 text-white text-sm py-1 mt-1 mr- px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={addRound}
        className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {" "}
        Add round{" "}
      </button>
    </div>
  );
}

export default RoundDetail;

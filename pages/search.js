import useToken from "../context/tokenContext.js";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Search() {
  const { token } = useToken();
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (token) {
      console.log("current token", token);
    }
    if (userData.length > 0) {
      console.log(userData);
      console.log("Data found");
    }
  }, [token]);

  async function search() {
    try {
      const response = await axios.post(
        "https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/GetUsers",
        {
          Body: {
            SearchText: searchValue,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data.Body);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl">Busqueda de usuarios</h1>
      <input
        type="search"
        className="border-2 border-black mx-4 my-8 p-2"
        placeholder="search"
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        value={searchValue}
      />
      <button onClick={search} className="border-2 border-black mx-4 p-2">
        OK
      </button>
      <h2>Results</h2>
      <table className="table-auto border-2 border-black border-collapse">
        <thead>
          <tr>
            <th className="border-2 border-black p-2">Name</th>
            <th className="border-2 border-black p-2">Username</th>
            <th className="border-2 border-black p-2">Father last name</th>
            <th className="border-2 border-black p-2">Mother last name</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td class="border border-green-600 ...">Indiana</td>
            <td class="border border-green-600 ...">Indianapolis</td>
            <td class="border border-green-600 ...">Indiana</td>
            <td class="border border-green-600 ...">Indianapolis</td>
          </tr> */}
          {userData.map((user) => {
            return (
              <tr key={user.Id}>
                <td className="border border-black p-2">{user.Name}</td>
                <td className="border border-black p-2">{user.Username}</td>
                <td className="border border-black p-2">
                  {user.FatherLastName}
                </td>
                <td className="border border-black p-2">
                  {user.MotherLastName}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

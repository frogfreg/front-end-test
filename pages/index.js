import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useToken from "../context/tokenContext.js";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const { token, setToken } = useToken();
  const router = useRouter();

  async function submit() {
    try {
      const response = await axios.post(
        "https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/authentication/authentication",
        { Body: { Username: user, Password: password } }
      );
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (data) {
      if (data.IsOK === true) {
        console.log("User authenticated");
        setToken(data.Body.Token);
      } else {
        alert(
          "Sus datos son incorrectos, verifique su información e intente nuevamente"
        );
      }
    }
    if (token) {
      console.log("token in context", token);
      router.push("/links");
    }
  }, [data, token]);

  return (
    <div>
      <h1 className="text-5xl text-center">Inicio de Sesion</h1>
      <div className="w-1/2 mx-auto flex flex-col items-center my-4">
        <div>
          <label>Usuario</label>

          <input
            onChange={(event) => {
              setUser(event.target.value);
            }}
            value={user}
            className="px-4 mx-4"
            type="text"
            placeholder="username"
          />
        </div>
        <div>
          <label>Password</label>

          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
            className="px-4 mx-4"
            type="password"
            placeholder="password"
          />
        </div>
        <button
          onClick={() => {
            submit();
          }}
          className="p-2 rounded border-black border-2 m-4"
        >
          OK
        </button>
      </div>
    </div>
  );
}

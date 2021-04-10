import useToken from "../context/tokenContext.js";
import { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";
import axios from "axios";

export default function Register() {
  const { token } = useToken();
  const router = useRouter();
  const [formData, setFormData] = useState({
    Tenant: null,
    UserName: "",
    Password: "",
    Name: "",
    FatherLastName: "",
    MotherLastName: "",
    Email: "",
    PhoneNumber: "",
    Metadata: null,
    Roles: [
      {
        Id: 2,
        Name: "Usuario Tradicional",
      },
    ],
  });

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function createUser() {
    try {
      const response = await axios.post(
        "https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/RegisterUserRole",
        { Body: formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      if (response.data.IsOK === false) {
        alert(`Verifica tu información: ${response.data.Messages}`);
      }
      if (response.data.IsOK === true) {
        router.push("/search");
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (token) {
      console.log("Current token", token);
    }
  }, [token]);

  return (
    <div>
      <h1 className="text-center text-5xl mb-8">Register form</h1>
      <div className="flex flex-col items-center md:w-3/4 mx-auto ">
        <div className="w-1/3 justify-center flex p-2">
          <label className="w-1/3">Username</label>
          <input
            onChange={handleChange}
            name="UserName"
            className="ml-8 p-2 w-2/3"
            type="text"
            placeholder="username"
          />
        </div>
        <div className="w-1/3 justify-center flex p-2">
          <label className="w-1/3">Password</label>
          <input
            onChange={handleChange}
            name="Password"
            className="ml-8 p-2 w-2/3"
            type="password"
            placeholder="password"
          />
        </div>
        <div className="w-1/2 justify-center flex p-2">
          <label className="">Name</label>
          <input
            onChange={handleChange}
            name="Name"
            className="ml-8 p-2"
            type="text"
            placeholder="name"
          />
        </div>
        <div className="w-1/2 justify-center flex p-2">
          <label className="">Father last name</label>
          <input
            onChange={handleChange}
            className="ml-8 p-2"
            type="text"
            placeholder="father last name"
            name="FatherLastName"
          />
        </div>
        <div className="w-1/2 justify-center flex p-2">
          <label className="">Mother last name</label>
          <input
            onChange={handleChange}
            className="ml-8 p-2"
            type="text"
            placeholder="mother last name"
            name="MotherLastName"
          />
        </div>
        <div className="w-1/2 justify-center flex p-2">
          <label className="">Email</label>
          <input
            onChange={handleChange}
            className="ml-8 p-2"
            type="email"
            placeholder="email"
            name="Email"
          />
        </div>
        <div className="w-1/2 justify-center flex p-2">
          <label className="">Phone number</label>
          <input
            onChange={handleChange}
            className="ml-8 p-2"
            type="tel"
            placeholder="phone number"
            name="PhoneNumber"
          />
        </div>
        <button
          onClick={createUser}
          className="border-2 border-black px-4 py-2"
        >
          OK
        </button>
      </div>
    </div>
  );
}

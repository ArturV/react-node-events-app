import React, { FormEventHandler, useState } from "react";
export const AddUser = () => {
  const [userData, setUserData] = useState({
    nameAndSurname: "",
    event: "",
    email: "",
    birthDate: "",
    age: null,
  });

  let date = new Date().toLocaleDateString("lt-LT");

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    console.log(userData);
  };

  const handleUserDataChange = (
    value: string,
    key: "email" | "nameAndSurname" | "event" | "birthDate" | "age"
  ) => {
    setUserData((prevUserData) => ({ ...prevUserData, [key]: value }));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Name & Surname"
        value={userData.nameAndSurname}
        onChange={(e) => {
          handleUserDataChange(e.target.value, "nameAndSurname");
        }}
      />
      <select
        name="event"
        value={userData.event}
        onChange={(e) => {
          handleUserDataChange(e.target.value, "event");
        }}
      >
        <option value="a">a</option>
        <option value="b">b</option>
        <option value="c">c</option>
        <option value="d">d</option>
      </select>
      <input
        type="text"
        placeholder="Email"
        value={userData.email}
        onChange={(e) => {
          handleUserDataChange(e.target.value, "email");
        }}
      />
      <input
        type="date"
        value={userData.birthDate}
        min="1918-01-01"
        onChange={(e) => {
          console.log(e.target.value);
          console.log(date);
          handleUserDataChange(e.target.value, "birthDate");
        }}
      />
      <input
        type="text"
        placeholder={userData.birthDate}
        value={userData.birthDate}
        onChange={(e) => {
          handleUserDataChange(e.target.value, "age");
        }}
      />
      //todo: add age calculation
      <button>Submit</button>
    </form>
  );
};

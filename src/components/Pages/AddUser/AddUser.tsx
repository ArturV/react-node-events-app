import React, { FormEventHandler, useState } from "react";
export const AddUser = () => {
  const [userData, setUserData] = useState({
    nameAndSurname: "",
    event: "",
    email: "",
    birthDate: "",
    age: null,
  });

  const calculateAge = (birthDate: string): number => {
    if (!birthDate || birthDate === "") {
      return 0;
    } else {
      let today = new Date();
      let birthDayConverted = new Date(birthDate);
      let age = today.getFullYear() - birthDayConverted.getFullYear();
      const month = today.getMonth() - birthDayConverted.getMonth();

      if (
        month < 0 ||
        (month === 0 && today.getDate() < birthDayConverted.getDate())
      ) {
        age--;
      }

      return age;
    }
  };

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
          handleUserDataChange(e.target.value, "birthDate");
        }}
      />
      <input
        type="text"
        placeholder="Age"
        readOnly
        value={calculateAge(userData.birthDate)}
      />

      <button>Submit</button>
    </form>
  );
};

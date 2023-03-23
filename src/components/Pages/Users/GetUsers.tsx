import axios from "axios";
import { useEffect, useState } from "react";
import { RenderUsers } from "./RenderUsers";

export const GetUsers = () => {
  const [usersCards, setUsersCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const SERV = `http://localhost:5000/users`;

  const getData = async () => {
    try {
      const response = await axios.get(SERV);

      setUsersCards(response.data);
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1_00);
  };

  const removeData = (id: any) => {
    const shouldDelete = window.confirm("Are you want to delete?");

    if (!shouldDelete) {
      return;
    }

    axios
      .delete(`http://localhost:3000/users/${id}`)
      .then(() => {
        getData();
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="users-card">
          {usersCards.map((userCard) => (
            <div
              onClick={() => {
                removeData(userCard.iduser);
              }}
              key={userCard.id}
              className="users-container"
            >
              <p>ID:{userCard.iduser}</p>
              <p>People:{userCard.fullname}</p>
              <p>Price:{userCard.event}</p>
            </div>
          ))}
        </div>
      )}

      <RenderUsers />
    </>
  );
};

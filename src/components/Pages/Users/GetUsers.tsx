import axios from "axios";
import { useEffect, useState } from "react";

export const GetUsers = () => {
  const [usersCards, setUsersCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const SERV = `https://believed-shore-vanadium.glitch.me`;

  const getData = async () => {
    try {
      const response = await axios.get(SERV);
      setUsersCards(response.data);
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1_000);
  };

  const removeData = (id: any) => {
    const shouldDelete = window.confirm("Are you want to delete?");

    if (!shouldDelete) {
      return;
    }

    axios
      .delete(`https://believed-shore-vanadium.glitch.me/${id}`)
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
                removeData(userCard.id);
              }}
              key={userCard.id}
              className="users-container"
            >
              <p>ID:{userCard.id}</p>
              <p>People:{userCard.people}</p>
              <p>Price:{userCard.price}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

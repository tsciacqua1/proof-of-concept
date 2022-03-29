import React, { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
  });

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem("user"));
    setUser({
      firstname: ls?.user.firstname,
      lastname: ls?.user.lastname,
    });
  }, []);

  return (
    <div className="home">
      {user && (
        <h1>
          Hi {user.firstname} {user.lastname}!
        </h1>
      )}
    </div>
  );
};

export default Home;

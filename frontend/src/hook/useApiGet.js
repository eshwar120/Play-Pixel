import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserConext";

const useApiGet = (path,update) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { SERVER_ADDRESS, token, updateLoginStatus } = useContext(UserContext);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  // console.log(path)

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(`${SERVER_ADDRESS}${path}`, config)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        // console.log(err.response.data.logOut);
        if (err.response.data.logOut === true) {
          updateLoginStatus(true);
        }
        setError(true);
        setLoading(false);
      });

    return () => {
      setData([]);
    };
  }, [path,update]);
  // console.log(data)
  return { loading, data, error };
};

export { useApiGet };

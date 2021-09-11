import { useEffect, useState } from "react";
function useFetch(url) {
  const [imageList, setImageList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setImageList(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [url]);
  return { imageList, error, loading };
}
export default useFetch;

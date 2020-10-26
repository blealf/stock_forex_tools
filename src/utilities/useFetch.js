import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!url) return;
    fetch(url)
    .then(setLoading(true))
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        response.json().then(function(dataJSON) {
          setData(dataJSON);
        });
      }
    )
    .then(() => setLoading(false))
    .catch(setError);
  }, [url])

  // if (loading) return loadingFallback;
  // if (error) return renderError(error)
  // if (data) return renderSuccess({ data })
  return {
    loading,
    data,
    error
  }
}

export default useFetch;
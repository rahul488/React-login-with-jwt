import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

const useFetch = () => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const abortRef = useRef();

  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  const makeRequest = useCallback(async (type = "GET", url, payload = {}) => {
    if (abortRef.current?.signal) {
      abortRef.current.abort("Request Cancelled.");
    }
    abortRef.current = new AbortController();

    const requestOptions = {
      signal: abortRef.current.signal,
    };

    if (localStorage.getItem("token_rc")) {
      requestOptions["headers"] = {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token_rc")).token,
      };
    }

    try {
      setLoading(true);
      let res = [];
      if (type === "GET") {
        res = await axios.get(url, { ...requestOptions });
      } else if (type === "POST") {
        res = await axios.post(url, payload, { ...requestOptions });
      } else if (type === "PUT") {
        res = await axios.put(url, payload, { ...requestOptions });
      } else {
        res = await axios.delete(url, { ...requestOptions });
      }
      let data = await res.data;
      if (typeof data === "string") {
        setMessage(data);
      } else {
        setMessage("");
      }
      setData(data);
      setLoading(false);
      setSuccess(true);
      setError(false);
    } catch (error) {
      setMessage(error.message);
      setData(undefined);
      setError(true);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const get = async (url) => {
    makeRequest("GET", url);
  };
  const post = async (url, payload) => {
    makeRequest("POST", url, payload);
  };
  const put = async (url, payload) => {
    makeRequest("PUT", url, payload);
  };
  const del = async (url) => {
    makeRequest("DELETE", url);
  };

  return {
    data,
    loading,
    get,
    post,
    put,
    del,
    success,
    error,
    message,
  };
};
export default useFetch;

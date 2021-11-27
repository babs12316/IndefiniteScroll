import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

type DisplayDataProps<T> = {
  data: T[];
};

type ScrollComponentProps = {
  apiUrl: string;
  pageNumber: string;
  pageLimit: string;
};

const ScrollComponent = <T extends Object>({
  apiUrl,
  pageNumber,
  pageLimit,
}: ScrollComponentProps) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    axios
      .get(`${apiUrl}?${pageNumber}=${page}&${pageLimit}=${limit * page}`)
      .then((result) => setData(result.data));
  }, [page, limit, apiUrl, pageNumber, pageLimit]);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (data.length === 0) {
    return null;
  }

  return <DisplayData data={data} />;
};

export default React.memo(ScrollComponent);

const DisplayData = <T extends object>({ data }: DisplayDataProps<T>) => {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: T, index: number) => (
          <tr key={index}>
            {(Object.keys(data[0]) as Array<keyof T>).map((key) => (
              <td key={key.toString()}>{item[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

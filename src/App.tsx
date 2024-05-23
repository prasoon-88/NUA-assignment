import axios from "axios";
import { useEffect, useState } from "react";
import Input from "./component/input";
import { TableField } from "./types";
import Table from "./component/table";

function App() {
  const BASE_API: string = "https://openlibrary.org/search.json";
  const BASIC_TABLE_FIELDS: TableField[] = [
    { label: "Title", value: "title" },
    { label: "Subject", value: "subject" },
    { label: "Average Ratings", value: "ratings_average" },
    { label: "Author's Top Work", value: "author_top_work" },
    { label: "Author's Birth Date", value: "author_birth_date" },
    { label: "First Publish Year", value: "first_publish_year" },
  ];

  const [query, setQuery] = useState<string>("harry potter");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [books, setBooks] = useState<any[]>([]);

  const createParams = (): string => {
    let params = "";
    if (BASIC_TABLE_FIELDS?.length) {
      params +=
        "fields=" +
        BASIC_TABLE_FIELDS.map((field: TableField) => field.value).join(",");
    }
    if (limit) {
      params += `&limit=${limit}`;
    }
    if (page) {
      params += `&page=${page}`;
    }
    if (query) {
      params += `&q=${query}`;
    }
    return BASE_API + "?" + params;
  };

  const fetchBooks = async () => {
    try {
      const resp = await axios.get(createParams());
      setBooks(resp.data?.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let tid = null;
    tid = setTimeout(() => {
      fetchBooks();
    }, 500);
    return () => {
      clearTimeout(tid);
    };
  }, [query, page, limit]);

  return (
    <div id="app" className="p-24">
      <div className="searchBox">
        <Input
          onChange={(e: any) => setQuery(e.target.value)}
          value={query}
          placeholder="Search books"
          classNames="p-6 pl-12 pr-12"
        />
      </div>
      <Table head={BASIC_TABLE_FIELDS} body={books} classNames="mt-24 mb-24" />
    </div>
  );
}

export default App;

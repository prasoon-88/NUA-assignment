import axios from "axios";
import { useEffect, useState } from "react";
import Input from "../component/input";
import { TableField } from "../types";
import Table from "../component/table";
import Loader from "../component/loader";
import Dropdown from "../component/dropdown";
import { clearAllCookies, downloadCSV } from "../utils";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const BASE_API: string = "https://openlibrary.org/search.json";
  const [query, setQuery] = useState<string>("harry potter");
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [books, setBooks] = useState<any[]>([]);

  const BASIC_TABLE_FIELDS: TableField[] = [
    { label: "Title", value: "title" },
    { label: "Subject", value: "subject" },
    { label: "Average Ratings", value: "ratings_average" },
    { label: "Author's Top Work", value: "author_top_work" },
    { label: "Author's Birth Date", value: "author_birth_date" },
    { label: "First Publish Year", value: "first_publish_year" },
  ];

  const PAGE_DROPDOWN_ITEMS = [
    {
      text: "10",
      action: () => setLimit(10),
      active: limit == 10,
    },
    {
      text: "20",
      action: () => setLimit(20),
      active: limit == 20,
    },
    {
      text: "50",
      action: () => setLimit(50),
      active: limit == 50,
    },
    {
      text: "100",
      action: () => setLimit(100),
      active: limit == 100,
    },
  ];

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
    setLoading(true);
    try {
      const resp = await axios.get(createParams());
      setBooks(resp.data?.docs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (operationType: "+" | "-") => {
    if (operationType == "+") {
      setPage(page + 1);
    } else {
      setPage(page - 1);
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
      {loading ? <Loader /> : ""}
      <header>
        <div className="searchBox">
          <Input
            onChange={(e: any) => setQuery(e.target.value)}
            value={query}
            placeholder="Search books"
            classNames="p-6 pl-12 pr-12"
          />
        </div>
        <div className="tableButton">
          <button
            className="button-p pt-6 pb-6 cursor-pointer"
            onClick={() => downloadCSV(BASIC_TABLE_FIELDS, books)}
          >
            Download CSV
          </button>
          <Dropdown
            children={PAGE_DROPDOWN_ITEMS}
            value={
              <button className="button-s pt-6 pb-6 cursor-pointer">
                Change Limit
              </button>
            }
          />
          <button
            className="button-s pt-6 pb-6 cursor-pointer"
            disabled={page == 1}
            onClick={() => handlePageChange("-")}
          >
            Prev
          </button>
          <button
            className="button-s pt-6 pb-6 cursor-pointer"
            onClick={() => handlePageChange("+")}
          >
            Next
          </button>
        </div>
        <button
          className="button-p pt-6 pb-6 cursor-pointer"
          onClick={() => {
            clearAllCookies();
            navigate(0);
          }}
        >
          Logout
        </button>
      </header>
      <Table head={BASIC_TABLE_FIELDS} body={books} classNames="mt-24 mb-24" />
    </div>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import { searchUserList } from "../../api/user/userRequest";
import SearchBar from "../../components/user/searchBar/SearchBar";
import SearchResults from "../../components/user/searchResults/SearchResults";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  useEffect(() => {
    try {
      const fetchSearchData = async () => {
        if (searchInput !== "") {
          console.log(searchInput);
          const searchResponse = await searchUserList(searchInput);
          setSearchUsers(searchResponse);
        } else {
          setSearchUsers([]);
          console.log("null search input");
        }
      };
      fetchSearchData();
    } catch (error) {
      console.log(error);
    }
  }, [searchInput]);
  return (
    <>
      <div className="flex flex-col h-screen w-full p-5">
        <SearchBar setSearchInput={setSearchInput} />
        <SearchResults searchResults={searchUsers} />
      </div>
    </>
  );
};

export default Search;

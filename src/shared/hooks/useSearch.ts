import { useContext } from "react";
import { SearchContext } from "../constants/searchContext";

export const useSearch = () => useContext(SearchContext);
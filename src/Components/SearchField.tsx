
import {  TextField } from "@mui/material";
import React, {  useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { styled } from "@mui/material/styles";
type ISearchProps = {
  className?: string;
  value?: string;
  onSearch: (query: string) => void;
};

const SearchField: React.FC<ISearchProps> = ({
  className,
  value,
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState(value || "");
  const { t } = useTranslation();

  useEffect(() => {
    onSearch(searchValue);
  }, [searchValue, onSearch]);
  return (
    <>
      <TextField
        variant="outlined"
        type="text"
        label={t("form.search")}
        color="primary"
        onChange={(e : any) => setSearchValue(e.target.value)}
        value={value}
        // onChange={(e) => console.log(e)}
        className={`${className} outline-none w-[350x] max-sm:mt-5 hover:!border-green-500 border focus:!border-green-500 rounded-md border-gray-100`}
        placeholder={t("form.search")}
      />
    </>
  );
};
export default SearchField;

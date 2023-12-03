import { useTranslation } from "react-i18next";
import Loading from "../../Components/Loading";
import Pagination from "../../Components/Pagination";
import useCountryHook from "./hooks/useCountryHook";
import { useState } from "react";
import { Box, Stack } from "@mui/material";
import Title from "../../Components/Title";
import SearchField from "../../Components/SearchField";
import TableHeader from "../../Components/TableHeader";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddCountry from "./AddCountry";
import DeleteCustome from "../../Components/DeleteCustome";
import { CountryApi } from "../../API/Country/CountryApi";
import { askForPermission } from "../../helper/askForPermission";
import NoData from "../../Components/NoData";
const Country = () => {
  const { t } = useTranslation();
  const [PageNumber, setPageNumber] = useState(0);
  const [query, setQuery] = useState<string>("");
  const [id, setId] = useState<string>("");
  const TableHeaderArray = [
    t("Country.name"),
    t("Country.currency"),
    t("Country.countryCode"),
    t("table.handel"),
  ];
  const { allCountries, allCountriesIsLoading, refetch, isFetching } =
    useCountryHook(id, PageNumber , query);

    const permission = askForPermission ('Country');

  // console.log({ allCountries });
  const matches = useMediaQuery("(max-width:700px)");

  return (
    <>
      {allCountriesIsLoading ? (
        <Box marginTop="10px" height="100vh">
          <Loading />
        </Box>
      ) 
      : (
        <Box
          sx={{
            paddingInline: "40px",
            marginTop: "30px",
            textAlign: "center",
            height: "initial",
          }}
        >
          {permission.canAdd && (<AddCountry />)}
          <Stack direction={`${matches ? "column" : "row"}`} spacing={10}>
            <Title text={t('Country.title')} />
            <SearchField onSearch={(value) => setQuery(value)} value={query} />
          </Stack>
          <>
          {allCountries?.data.length === 0 ?<NoData/> :
            <Stack marginTop="40px">
              <TableHeader TableHeaderArray={TableHeaderArray}>
                <TableBody>
                  {allCountries?.data.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell align="center" sx={{ fontSize: "17px" }}>
                        {d.name}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "17px" }}>
                        {d.currency}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "17px" }}>
                        {d.countryCode}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        {permission.canDelete && (
                          <DeleteCustome
                          refetch={refetch}
                          MassegeSuccess={t("Country.delete")}
                          onDelete={() => CountryApi.RemoveCountry(id)}
                          setId={() => setId(d?.id ?? "")}
                          userId={id ?? ""}
                        />
                        )}
                        {permission.canEdit && (
                          <AddCountry id={d.id} setId={() => setId(d.id ?? "")} />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableHeader>
              <Pagination
                page={PageNumber}
                isFetching={isFetching}
                onPageChange={setPageNumber}
                totalPages={allCountries?.totalPages!}
              />
            </Stack>
}
          </>
        </Box>
      )}
    </>
  );
};

export default Country;

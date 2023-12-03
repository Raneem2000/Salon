import { useState } from "react";
import { useTranslation } from "react-i18next";
import Pagination from "../../Components/Pagination";
import TableHeader from "../../Components/TableHeader";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Box, Stack } from "@mui/material";
import Loading from "../../Components/Loading";
import Title from "../../Components/Title";
import SearchField from "../../Components/SearchField";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddCity from "./AddCity";
import { CityApi } from "../../API/City/CityApi";
import DeleteCustome from "../../Components/DeleteCustome";
import { askForPermission } from "../../helper/askForPermission";
import NoData from "../../Components/NoData";
import { CityQueries } from "../../API/City/CityQueries";
import { CountryQueries } from "../../API/Country/CountryQueries";

function City() {
  const { t } = useTranslation();
  const [PageNumber, setPageNumber] = useState(0);
  const [query, setQuery] = useState<string>("");
  const [id, setId] = useState<string>("");
  const { data: countryOption } = CountryQueries.GetCountryAutoCompleteQuery();
  // const { allCountries, allCountriesIsLoading, refetch, isFetching } =
  // useCountryHook(id, PageNumber , query);
  const {
    data: allCities,
    isLoading,
    refetch,
    isFetching,
  } = CityQueries.GetAllCitiesQuery({ PageNumber: PageNumber, Query: query });

  const getCountryNameById = (countryId: string) => {
    const country = countryOption?.find((country) => country.id === countryId);
    return country?.name;
  };
  // console.log({ allCities });

  const TableHeaderArray = [
    t("City.name"),
    t("Country.name"),
    t("table.handel"),
  ];
  const matches = useMediaQuery("(max-width:700px)");
  const permission = askForPermission("City");

  return (
    <>
      {isLoading ? (
        <Box marginTop="10px" height="100vh">
          <Loading />
        </Box>
      ) : (
        <Box
          sx={{
            paddingInline: "40px",
            marginTop: "30px",
            textAlign: "center",
            height: "initial",
          }}
        >
          {permission.canAdd && <AddCity />}
          <Stack direction={`${matches ? "column" : "row"}`} spacing={10}>
            <Title text={t("City.title")} />
            <SearchField onSearch={(value) => setQuery(value)} value={query} />
          </Stack>
          <>
            {allCities?.data.length === 0 ? (
              <NoData />
            ) : (
              <Stack marginTop="40px">
                <TableHeader TableHeaderArray={TableHeaderArray}>
                  <TableBody>
                    {allCities?.data?.map((d) => (
                      <TableRow key={d.id}>
                        <TableCell align="center" sx={{ fontSize: "17px" }}>
                          {d.name}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: "17px" }}>
                          {getCountryNameById(d.countryId)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          {permission.canDelete && (
                            <DeleteCustome
                              refetch={refetch}
                              MassegeSuccess={t("City.delete")}
                              onDelete={() => CityApi.DeleteCity(id)}
                              setId={() => setId(d?.id ?? "")}
                              userId={id ?? ""}
                            />
                          )}

                          {permission.canEdit && (
                            <AddCity
                              id={d.id}
                              setId={() => setId(d.id ?? "")}
                            />
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
                  totalPages={allCities?.totalPages!}
                />
              </Stack>
            )}
          </>
        </Box>
      )}
    </>
  );
}

export default City;

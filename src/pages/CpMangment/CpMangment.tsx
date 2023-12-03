import { useTranslation } from "react-i18next";
import { Box, Stack } from "@mui/material";
import TableHeader from "../../Components/TableHeader";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { CpManagementQueries } from "../../API/CpManagement/CpManagementQueries";
import { useState } from "react";
import Pagination from "../../Components/Pagination";
import Loading from "../../Components/Loading";
import Title from "../../Components/Title";
import SearchField from "../../Components/SearchField";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddUser from "./AddUser";
import { CpManagementApi } from "../../API/CpManagement/CpManagementApi";
import DeleteCustome from "../../Components/DeleteCustome";
import { askForPermission } from "../../helper/askForPermission";
import NoData from "../../Components/NoData";
const CpMangment = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [id, setId] = useState<string>("");
  const permission = askForPermission("CpManagement");
  const TableHeaderArray = [
    t("table.name"),
    t("table.role"),
    t("table.handel"),
  ];
  const {
    data: CpManagementData,
    isFetching,
    refetch,
    isLoading,
  } = CpManagementQueries.GetUsersQuery({
    PageNumber: page,
    Query: query,
  });
  const matches = useMediaQuery("(max-width:700px)");
  return (
    <>
      {isLoading ? (
        <Box marginTop="150px">
          <Loading />
        </Box>
      ) : (
        <Box
          sx={{
            paddingInline: "40px",
            marginTop: "30px",
            textAlign: "center",
          }}
        >
          {permission.canAdd && <AddUser />}
          <Stack direction={`${matches ? "column" : "row"}`} spacing={10}>
            <Title text={t("cpMangment.title")} />
            <SearchField onSearch={(value) => setQuery(value)} value={query} />
          </Stack>
          <>
            {CpManagementData?.data.length === 0 ? (
              <NoData />
            ) : (
              <Stack marginTop="40px">
                <TableHeader TableHeaderArray={TableHeaderArray}>
                  <TableBody>
                    {CpManagementData?.data.map((d) => (
                      <TableRow key={d.id}>
                        <TableCell align="center" sx={{ fontSize: "17px" }}>
                          {d.username}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: "17px" }}>
                          {d.role}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          {permission.canDelete && (
                            <DeleteCustome
                              refetch={refetch}
                              MassegeSuccess={t("cpMangment.delete")}
                              onDelete={() => CpManagementApi.DeleteUser(id)}
                              setId={() => setId(d?.id ?? "")}
                              userId={id ?? ""}
                            />
                          )}
                          {permission.canEdit && (
                            <AddUser
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
                  page={page}
                  isFetching={isFetching}
                  onPageChange={setPage}
                  totalPages={CpManagementData?.totalPages!}
                />
              </Stack>
            )}
          </>
        </Box>
      )}
    </>
  );
};
export default CpMangment;

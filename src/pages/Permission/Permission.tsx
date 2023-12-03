import {
  Box,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import Title from "../../Components/Title";
import { useTranslation } from "react-i18next";
import TableHeader from "../../Components/TableHeader";
import { PermissionQueries } from "../../API/Permission/PermissionQueries";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import Loading from "../../Components/Loading";
import NoData from "../../Components/NoData";
const Permission = () => {
  const { t } = useTranslation();
  const matches = useMediaQuery("(max-width:700px)");
  const TableHeaderArray = [t("table.name"), t("table.handel")];
  const navigate = useNavigate();
  const { data, isLoading } = PermissionQueries.GetRolesContentsQuery();
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
          <Stack direction={`${matches ? "column" : "row"}`} spacing={10}>
            <Title text={t("permission.title")} />
            {/* <SearchField onSearch={(value) => setQuery(value)} value={query} /> */}
          </Stack>
          {data?.length === 0 ? (
            <NoData />
          ) : (
            <Stack marginTop="40px">
              <TableHeader TableHeaderArray={TableHeaderArray}>
                <TableBody>
                  {data?.map((d) => (
                    <TableRow key={d.roleId}>
                      <TableCell align="center" sx={{ fontSize: "17px" }}>
                        {d.roleName}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton>
                          <EditIcon
                            onClick={() => navigate(`edit-role/${d.roleId}`)}
                            color="primary"
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableHeader>
            </Stack>
          )}
        </Box>
      )}
    </>
  );
};
export default Permission;

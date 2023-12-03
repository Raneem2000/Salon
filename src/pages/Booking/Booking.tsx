import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BookingQueries } from '../../API/Booking/BookingQueries';
import Loading from '../../Components/Loading';
import { Box, Stack, TableBody, TableCell, TableRow, useMediaQuery } from '@mui/material';
import Title from '../../Components/Title';
import SearchField from '../../Components/SearchField';
import TableHeader from '../../Components/TableHeader';
import Pagination from '../../Components/Pagination';
import NoData from '../../Components/NoData';

function Booking() {

  const {t} = useTranslation();
  const [page, setPage] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const {data : BookingData, isLoading, isFetching} = BookingQueries.GetAllBookingQuery({
    PageNumber: page,
    Query: query,
  })
console.log(BookingData);

const TableHeaderArray = [
  t("Booking.code"),
  t("Booking.customerName"),
  t("Booking.customerNumber"),
  t("Booking.bookingStatus"),
  t("table.handel"),
];

const matches = useMediaQuery("(max-width:700px)");

  return (
  <>
    {
    isLoading
    ? (
      <Box marginTop="10px" height="100vh">
        <Loading />
      </Box>
    )
    :(
      <Box
          sx={{
            paddingInline: "40px",
            marginTop: "30px",
            textAlign: "center",
            height: "initial",
          }}
        >
          <Stack direction={`${matches ? "column" : "row"}`} spacing={10}>
            <Title text={t('Booking.title')} />
            <SearchField onSearch={(value) => setQuery(value)} value={query} />
          </Stack>
          <>
          {BookingData?.data.length === 0 ? <NoData/> : (
            <Stack marginTop="40px">
              <TableHeader TableHeaderArray={TableHeaderArray}>
                <TableBody>
                  {BookingData?.data.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell align="center" sx={{ fontSize: "17px" }}>
                        {d.code}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "17px" }}>
                        {d.customerName}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "17px" }}>
                        {d.customerNumber}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "17px" }}>
                        {d.bookingStatus}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                      
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableHeader>
              <Pagination
                page={page}
                isFetching={isFetching}
                onPageChange={setPage}
                totalPages={BookingData?.totalPages!}
              />
            </Stack>
          )}
          </>
        </Box>
    )
    }
  </>
  )
}

export default Booking
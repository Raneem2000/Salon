import { Box, Grid } from "@mui/material";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleFill } from "react-icons/ri";
import { FC } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
type IProps = {
  page: number;
  isFetching: boolean;
  totalPages: number;
  // isPreviousData: boolean;
  onPageChange: (arg: number) => void;
};
const Pagination: FC<IProps> = ({
  onPageChange,
  page,
  isFetching,
  totalPages,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid container justifyContent={"end"} marginY="30px">
        <Box display="flex" gap="10px">
          <Button
            color="primary"
            disabled={page === 0}
            onClick={() => onPageChange(page - 1)}
            variant="outlined"
            sx={{ mx: 2 }}
          >
            <RiArrowLeftDoubleLine />
            {t("btns.prev")}
          </Button>
          <Button
            disabled={isFetching || page >= totalPages - 1}
            color="primary"
            onClick={() => onPageChange(page + 1)}
            variant="outlined"
            sx={{ mx: 2 }}
          >
            {t("btns.next")}
            <RiArrowRightDoubleFill />
          </Button>
        </Box>
      </Grid>
    </>
  );
};
export default Pagination;

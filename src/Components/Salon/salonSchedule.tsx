import {
  Stack,
  Switch,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Day, DayArray } from "../../API/Salon/type";
import TableHeader from "../TableHeader";
import { Controller, UseFormWatch } from "react-hook-form";
import { FC } from "react";
import FormTextField from "../Form/FormTextField";
import { DefaultFromDate } from "../../helper/imgHelper";
import { useTranslation } from "react-i18next";

const salonSchedule: FC<{ control: any, watch: UseFormWatch<any>, title: string }> = ({
  control,
  title,
  watch
}) => {
  const workSchedule: {
    day: Day;
    startTime: string;
    endTime: string;
    isFree: boolean;
  }[] = DayArray.map((day) => ({
    day: day,
    startTime: DefaultFromDate(),
    endTime: "",
    isFree: true,
  }));
  const { t } = useTranslation()
  const TableHeaderArray = [t("salon.Day"), t("salon.Available"), t("salon.from"), t("salon.to")];
  return (
    <>
      <Stack
        marginTop="40px"
        marginInline={`auto`}
        alignItems={`center`}
        justifyContent={`center`}
        textAlign={`center`}
      >
        <Typography
          variant="h4"
          sx={{
            marginY: "10px",
          }}
        >
          {title}
        </Typography>
        <TableHeader TableHeaderArray={TableHeaderArray}>
          <TableBody>
            {workSchedule.map((day, index) => (
              <TableRow key={day.day.id}>
                <TableCell>{day.day.day}</TableCell>
                <TableCell>
                  <Controller
                    name={`workSchedule.${index}.isFree`}
                    control={control}
                    render={({ field }) => (
                      <Switch checked={field.value} onChange={field.onChange} />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormTextField
                    name={`workSchedule.${index}.startTime`}
                    control={control}
                    disabled={!watch(`workSchedule.${index}.isFree`)}
                    type={"time"}
                    step={"1"}
                  />
                </TableCell>
                <TableCell>
                  <FormTextField
                    name={`workSchedule.${index}.endTime`}
                    control={control}
                    disabled={!watch(`workSchedule.${index}.isFree`)}
                    type={"time"}
                    step={"1"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableHeader>
      </Stack>
    </>
  );
};
export default salonSchedule;

import { ChangeEvent, FC, useEffect, useState } from "react";
import { IContentPermission, IPermissionGet } from "../../API/Permission/type";
import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  Stack,
} from "@mui/material";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

const CheckContent: FC<{
  content: IContentPermission;
  register: UseFormRegister<IPermissionGet>;
  control: Control<IPermissionGet, any>;
  index: number;
  setValue: UseFormSetValue<IPermissionGet>;
  watch: UseFormWatch<IPermissionGet>;
}> = ({ content, control, index, setValue, watch }) => {
  const [openContent, setOpenContent] = useState<boolean>(true);

  const contentArray = Object.entries(content)
    .filter(([_key, value]) => typeof value === "boolean")
    .map(([key, value]) => [key, value]);

  const changeParentHandler = (
    _event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked) {
      setValue(`contents.${index}.canAdd`, true);
      setValue(`contents.${index}.canEdit`, true);
      setValue(`contents.${index}.canView`, true);
      setValue(`contents.${index}.canDelete`, true);
      setValue(`contents.${index}.canDownload`, true);
    } else {
      setValue(`contents.${index}.canAdd`, false);
      setValue(`contents.${index}.canEdit`, false);
      setValue(`contents.${index}.canView`, false);
      setValue(`contents.${index}.canDelete`, false);
      setValue(`contents.${index}.canDownload`, false);
    }
  };

  const canAdd = watch(`contents.${index}.canAdd`);
  const canEdit = watch(`contents.${index}.canEdit`);
  const canDelete = watch(`contents.${index}.canDelete`);
  const canView = watch(`contents.${index}.canView`);
  const canDownload = watch(`contents.${index}.canDownload`);
  const all = canAdd && canDelete && canDownload && canEdit && canView;

  const [Parent, setParent] = useState<boolean>(true);

  useEffect(() => {
    if (all) {
      setParent(true);
    } else {
      setParent(false);
    }
  }, [canAdd, canDelete, canDownload, canEdit, canView, all]);

  setValue(`contents.${index}.id`, content.id);
  setValue(`contents.${index}.name`, content.name);

  return (
    <>
      <Stack direction={"row"} alignItems="center">
        <IconButton
          onClick={() => setOpenContent((open) => !open)}
          sx={{ p: 0.3 }}
        >
          {openContent ? <MdExpandLess /> : <MdExpandMore />}
        </IconButton>
        <FormControlLabel
          label={content.name}
          control={<Checkbox checked={Parent} onChange={changeParentHandler} />}
        />
      </Stack>
      <Collapse in={openContent}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginInlineStart: 7,
          }}
        >
          {contentArray.map((contentElement) => {
            return (
              <Controller
                name={
                  `contents.${index}.${contentElement[0]}` as `contents.${number}.${keyof IContentPermission}`
                }
                control={control}
                render={({ field: { value, name, onBlur, onChange, ref } }) => (
                  <FormControlLabel
                    label={contentElement[0]}
                    value={`contents.${index}.${contentElement[0]}`}
                    control={
                      <Checkbox
                        onChange={onChange}
                        ref={ref}
                        onBlur={onBlur}
                        name={name}
                        value={value}
                        checked={
                          typeof value === "boolean" && value === true
                            ? true
                            : false
                        }
                      />
                    }
                  />
                )}
              />
            );
          })}
        </Box>
      </Collapse>
    </>
  );
};
export default CheckContent;

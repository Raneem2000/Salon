import { FC, useState } from "react";
import { showSuccess, showError } from "../libs/reactToastify";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@tanstack/react-query";
import Loading from "./Loading";
import DeleteIcon from "@mui/icons-material/Delete";
const DeleteCustome: FC<{
  MassegeSuccess: string;
  refetch: () => void;
  userId: string;
  onDelete: (id: string) => Promise<unknown>;
  setId: (id: string) => void;
  className?: string;
  key?: string;
}> = ({ onDelete, MassegeSuccess, userId, setId, refetch }) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const mutation = useMutation({
    mutationFn: onDelete,
    onSuccess: () => {
      showSuccess(MassegeSuccess);
      setOpenModal(false);
      refetch();
      // queryClient.refetchQueries({ queryKey: [key] })
    },
    onError: (errorMessage: any) => {
      showError(errorMessage);
    },
  });
  const handleDelete = async () => {
    // console.log(userId);

    if (userId !== "" && typeof userId !== undefined) {
      mutation.mutate(userId);
    }
  };
  // console.log(MassegeSuccess)
  return (
    <>
      <Button onClick={() =>{ setOpenModal(true); setId(userId)}}>
        <DeleteIcon color="error" />
      </Button>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="responsive-dialog-title"
        fullScreen={true}
        sx={{
          maxWidth: "300px",
          marginInline: "auto",
          height: "130px",
          marginY: "auto",
        }}
      >
        <DialogTitle id="responsive-dialog-title" sx={{ textAlign: "center" }}>
          {t("delete.title")}
        </DialogTitle>
        <DialogActions>
          <Button color="error" onClick={() => setOpenModal(false)}>
            {t("delete.cancel")}
          </Button>
          <Button
            color="primary"
            onClick={handleDelete}
            disabled={mutation.isPaused}
          >
            {mutation.isPending ? <Loading size={20} /> : t("delete.yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DeleteCustome;

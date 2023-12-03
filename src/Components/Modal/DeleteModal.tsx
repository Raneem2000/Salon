import { FC, useState } from "react";
import { showSuccess, showError } from "../../libs/reactToastify";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { BiSolidTrashAlt } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import Loading from "../Loading";


const DeleteModal: FC<{
  MassegeSuccess: string;
  refetch: () => void
  userId: string;
  onDelete: (id: string) => Promise<unknown>;
  setId: (id: string) => void;
  className?: string;
  key?: string;
}> = ({ onDelete, MassegeSuccess, userId, setId, className, refetch }) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const mutation = useMutation({
    mutationFn: onDelete,
    onSuccess: () => {
      showSuccess(MassegeSuccess);
      setOpenModal(false);
      refetch()
      // queryClient.refetchQueries({ queryKey: [key] })
    },
    onError: (error: any) => {
      showError(error.response.data.errorMessage);
    },
  });
  const handleDelete = async () => {
    console.log(userId);

    if (userId !== "" && typeof userId !== undefined) {
      mutation.mutate(userId);
    }
  };
  // console.log(MassegeSuccess)
  return (
    <>
      <BiSolidTrashAlt
        onClick={() => {
          setOpenModal(true);
          setId(userId);
        }}
        className={` text-error  ${className} text-[20px] text-center cursor-pointer ml-2`}
      />
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
            {mutation.isPending ? (
              <Loading />
            ) : (
              t("delete.yes")
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DeleteModal;

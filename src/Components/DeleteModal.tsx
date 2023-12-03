import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "./Loading";

const DeleteModal: FC<{
    deleteFn: () => void;
    isLoading: boolean;
    Open: boolean;
    setOpen: (Open: boolean) => void;
}> = ({ deleteFn, isLoading, Open, setOpen }) => {
    const { t } = useTranslation();

    const deleteHandler = () => {
        deleteFn();
    };

    return (
        <>
            <Button color="error" onClick={() => setOpen(true)}>
                <DeleteIcon color="error" />
            </Button>
            <Dialog
                open={Open}
                onClose={() => setOpen(true)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{t("delete.title")}</DialogTitle>
                <DialogActions>
                    <Button color="info" onClick={() => setOpen(false)}>
                        {t("delete.cancel")}
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={deleteHandler}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loading size={20} /> : t("delete.yes")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteModal;

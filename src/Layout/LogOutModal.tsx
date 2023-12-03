import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

const LogoutModal = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Button
        color="error"
        variant="contained"
        onClick={() => setOpenModal(true)}
      >
        {t("Login.logout")}
      </Button>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ textAlign: "center" }}>
          {t("Login.Massegelogout")}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="error">
            {t("Login.cancel")}
          </Button>
          <Button onClick={handleClick} color="primary">
            {t("Login.yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default LogoutModal;

import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import Loading from "../Loading";

interface LoadingButtonProps {
  isSubmitting?: boolean;
  error?: boolean;
  width?: string;
  loadingSize?: number;
  text?: string;
  [key: string]: any;
  disabled?: boolean;
}

const SubmitButton = ({
  loadingSize,
  width,
  text,
  isSubmitting,
  error,
  disabled = false,
  ...props
}: LoadingButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      disabled={isSubmitting}
      variant="contained"
      type="submit"
      data-test={'submit'}
      color="primary"
      sx={{
        paddingX:"20px",
        paddingY:"5px"
      }}
      {...props}
      
    >
      { isSubmitting ? (
        <Loading  size={20} />
      ) : (
        text || t("form.submit")
      )}
    </Button>
  );
};

export default SubmitButton;

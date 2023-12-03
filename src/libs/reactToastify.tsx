import { toast, ToastOptions } from "react-toastify";



const customToastOption = {
    style: { width: "400px", right: "0", zIndex: "100" }
  };;
  export const showSuccess = (
    message: string,
    ToastOptions: ToastOptions = customToastOption
  ) =>
    toast.success(
      <div  data-cy="success-toast">
           <p>{message}</p>
       </div>,
      ToastOptions,
     
    );
    export const showError = (
        message: string,
        ToastOptions: ToastOptions = customToastOption
      ) => {
        toast.error(
       <div   >
           <p>{message}</p>
       </div>,
          ToastOptions
        );
      };
      


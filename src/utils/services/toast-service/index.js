import { toast } from "react-toastify";

export const Msg = ({ text }) => {
    return <p className="text-grey">{text}</p>;
};

export const toaster = (myProps, toastProps) => {
    const position = toastProps?.position || 'top-center';
    return toast(<Msg {...myProps} />, { ...toastProps, position });
};

toaster.success = (myProps, toastProps) => {
    const position = toastProps?.position || 'top-center';
    return toast.success(<Msg {...myProps} />, { ...toastProps, position, className: "border border-green-500" });
};

toaster.error = (myProps, toastProps) => {
    const position = toastProps?.position || 'top-center';
    return toast.error(<Msg {...myProps} />, { ...toastProps, position, className: "border border-red-500" });
};

toaster.warning = (myProps, toastProps) => {
    const position = toastProps?.position || 'top-center';
    return toast.warning(<Msg {...myProps} />, { ...toastProps, position, className: "border border-yellow-500" });
};

toaster.info = (myProps, toastProps) => {
    const position = toastProps?.position || 'top-center';
    return toast.info(<Msg {...myProps} />, { ...toastProps, position, className: "border border-sky-500" });
};
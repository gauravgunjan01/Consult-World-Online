// import { toast } from "react-toastify";

// export const Msg = ({ text }) => {
//     return <p className="text-grey">{text}</p>;
// };

// export const toaster = (myProps, toastProps) => {
//     const position = toastProps?.position || 'top-center';
//     return toast(<Msg {...myProps} />, { ...toastProps, position });
// };

// toaster.success = (myProps, toastProps) => {
//     const position = toastProps?.position || 'top-center';
//     return toast.success(<Msg {...myProps} />, { ...toastProps, position, className: "border border-green-500" });
// };

// toaster.error = (myProps, toastProps) => {
//     const position = toastProps?.position || 'top-center';
//     return toast.error(<Msg {...myProps} />, { ...toastProps, position, className: "border border-red-500" });
// };

// toaster.warning = (myProps, toastProps) => {
//     const position = toastProps?.position || 'top-center';
//     return toast.warning(<Msg {...myProps} />, { ...toastProps, position, className: "border border-yellow-500" });
// };

// toaster.info = (myProps, toastProps) => {
//     const position = toastProps?.position || 'top-center';
//     return toast.info(<Msg {...myProps} />, { ...toastProps, position, className: "border border-sky-500" });
// };


import { toast } from "react-toastify";

export const Msg = ({ text }) => {
    return <p className="text-grey">{text}</p>;
};

const defaultToastId = "global-toast";

export const toaster = (myProps, toastProps) => toast(<Msg {...myProps} />, { ...toastProps, toastId: defaultToastId });

toaster.success = (myProps, toastProps = {}) => toast.success(<Msg {...myProps} />, { toastId: defaultToastId, position: toastProps.position || "top-center", className: "border border-green-500", ...toastProps, });
toaster.error = (myProps, toastProps = {}) => toast.error(<Msg {...myProps} />, { toastId: defaultToastId, position: toastProps.position || "top-center", className: "border border-red-500", ...toastProps, });
toaster.warning = (myProps, toastProps = {}) => toast.warning(<Msg {...myProps} />, { toastId: defaultToastId, position: toastProps.position || "top-center", className: "border border-yellow-500", ...toastProps, });
toaster.info = (myProps, toastProps = {}) => toast.info(<Msg {...myProps} />, { toastId: defaultToastId, position: toastProps.position || "top-center", className: "border border-sky-500", ...toastProps, });
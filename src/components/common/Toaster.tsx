import { Toaster as SonnerToaster } from "sonner";

export const Toaster = () => {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          background: "var(--color-white)",
          color: "var(--color-theme)",
          border: "none",
        },
        className: "toast",
      }}
    />
  );
};

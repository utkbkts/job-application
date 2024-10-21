import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error: {
            toast: "bg-red-500 text-white border-red-600",
            description: "text-white",
            actionButton: "bg-white text-red-500",
            cancelButton: "bg-red-600 text-white",
          },
          success: {
            toast: "bg-green-500 text-white border-green-600",
            description: "text-white",
            actionButton: "bg-white text-green-500",
            cancelButton: "bg-green-600 text-white",
          },
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

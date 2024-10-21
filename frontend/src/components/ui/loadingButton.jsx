import { Loader2 } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const LoadingButton = ({ children, className }) => {
  return (
    <Button
      disabled={true}
      className={cn("w-full  bg-gray-400 hover:bg-gray-400 my-4", className)}
    >
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <span> {children}</span>
    </Button>
  );
};

export default LoadingButton;

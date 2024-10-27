import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Toaster } from "sonner";

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <div>
        <RouterProvider router={router} />
      </div>
      <Toaster richColors />
    </React.Fragment>
  );
};

export default App;

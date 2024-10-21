import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Toaster } from "sonner";

const App = () => {
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

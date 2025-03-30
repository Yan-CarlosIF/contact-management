import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import { Toaster } from "./components/ui/sonner";
import { queryClient } from "./lib/react-query";
import { router } from "./routes";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          closeButton: true,
        }}
      />
    </QueryClientProvider>
  );
};

export default App;

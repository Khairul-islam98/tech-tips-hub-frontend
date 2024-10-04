import Loader from "@/components/loader";
import Navbar from "@/components/shared/navbar/navbar";
import { ReactNode, Suspense } from "react";
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
          <Suspense fallback={<div><Loader /> </div>}>
        <Navbar />
      </Suspense>
      {children}
    </>
  );
};

export default RootLayout;

import { useState } from "react";
import _ from "lodash";
import { Toaster } from "sonner";

import type { AuthType } from "./appTypes";
import { useAuth } from "./contexts/AuthProvider";
import { Navbar, Footer } from "./ui-modules/navigation";
import { Main } from "./ui-modules/task";
import { AuthFactory } from "./ui-modules/auth";
import { WelcomeHeading } from "./ui-modules/component";

export default function App() {
  const { user } = useAuth();
  const [currentAuthMode, setCurrentAuthMode] = useState<AuthType>(
    (): AuthType => {
      const current_auth_mode = sessionStorage.getItem(
        "current_auth_mode"
      ) as AuthType | null;
      return current_auth_mode ?? "sign-in";
    }
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="relative z-10 w-full h-full flex flex-col overflow-auto gap-4 items-center justify-between">
        <Navbar />
        <div
          className={`w-full flex flex-col overflow-auto gap-4 items-center justify-between ${
            user?.name && user?.email ? "h-full" : "h-fit"
          }`}
        >
          <WelcomeHeading />
          {user?.name && user?.email ? (
            <Main />
          ) : (
            <AuthFactory
              currentAuthMode={currentAuthMode}
              setCurrentAuthMode={setCurrentAuthMode}
            />
          )}
        </div>
        <Footer />
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

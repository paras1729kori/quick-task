import type React from "react";

import type { AuthType } from "../../appTypes";
import { SignIn, SignUp, ForgotPassword, ResetPassword } from ".";

export default function AuthFactory({
  currentAuthMode,
  setCurrentAuthMode,
}: {
  currentAuthMode: string;
  setCurrentAuthMode: React.Dispatch<React.SetStateAction<AuthType>>;
}) {
  switch (currentAuthMode) {
    case "sign-in":
      return <SignIn setCurrentAuthMode={setCurrentAuthMode} />;

    case "sign-up":
      return <SignUp setCurrentAuthMode={setCurrentAuthMode} />;

    case "forgot-password":
      return <ForgotPassword setCurrentAuthMode={setCurrentAuthMode} />;

    case "reset-password":
      return <ResetPassword setCurrentAuthMode={setCurrentAuthMode} />;
  }
}

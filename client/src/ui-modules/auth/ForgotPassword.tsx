import React, { useState } from "react";
import _ from "lodash";
import { toast } from "sonner";

import { forgotPassword } from "../../services/auth";
import type { AuthType } from "../../appTypes";

export default function ForgotPassword({
  setCurrentAuthMode,
}: {
  setCurrentAuthMode: React.Dispatch<React.SetStateAction<AuthType>>;
}) {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleLogin = async () => {
    if (_.isEmpty(formData?.email)) {
      toast.warning("Please enter your registered email");
      return;
    }

    await forgotPassword(formData?.email);

    setCurrentAuthMode("reset-password");
    sessionStorage.setItem("current_auth_mode", "reset-password");
  };

  return (
    <div className="card bg-base-100 w-[90%] md:w-96 shadow-md">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Forgot Password</h2>
        <p>Please enter your registered email</p>
        <form className="w-full">
          <label className="input w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-envelope"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
            </svg>
            <input
              type="email"
              className="grow validator"
              placeholder="example@company.com"
              value={formData?.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              required
            />
          </label>
        </form>
        <div className="w-full card-actions">
          <button type="button" onClick={handleLogin} className="w-full btn">
            Submit
          </button>
        </div>
        <div className="w-full flex items-center justify-between mt-2">
          <div
            onClick={() => {
              setCurrentAuthMode("sign-in");
              sessionStorage.setItem("current_auth_mode", "sign-in");
            }}
            className="link"
          >
            Sign In
          </div>
          <div
            onClick={() => {
              setCurrentAuthMode("sign-up");
              sessionStorage.setItem("current_auth_mode", "sign-up");
            }}
            className="link"
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
}

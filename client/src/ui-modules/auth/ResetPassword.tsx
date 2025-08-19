import React, { useState } from "react";
import _ from "lodash";
import { toast } from "sonner";

import { resetPassword } from "../../services/auth";
import type { AuthType } from "../../appTypes";

export default function ResetPassword({
  setCurrentAuthMode,
}: {
  setCurrentAuthMode: React.Dispatch<React.SetStateAction<AuthType>>;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async () => {
    if (_.isEmpty(formData?.password)) {
      toast.warning("Please enter a password");
      return;
    }
    if (_.isEmpty(formData?.confirmPassword)) {
      toast.warning("Please enter a confirm password");
      return;
    }
    if (formData?.password !== formData?.confirmPassword) {
      toast.warning("Confirm password must match Password");
      return;
    }

    const resetToken = sessionStorage.getItem("token") || "";
    const res = await resetPassword(resetToken, formData?.password);

    if (res?.message?.includes("successfully")) {
      setCurrentAuthMode("sign-in");
      sessionStorage.setItem("current_auth_mode", "sign-in");
    }
  };

  return (
    <div className="card bg-base-100 w-[90%] md:w-96 shadow-md">
      <div className="card-body items-center text-center">
        <p
          className="underline self-start"
          onClick={() => {
            setCurrentAuthMode("forgot-password");
            sessionStorage.setItem("current_auth_mode", "forgot-password");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </p>

        <h2 className="card-title">Reset Password</h2>
        <form className="select-none">
          <label className="input w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-lock"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"
              />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              placeholder="Password"
              value={formData?.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              required
            />
            <PasswordEyeModes
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </label>
          <label className="input w-full mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-lock"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"
              />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              className="grow validator"
              placeholder="Confirm Password"
              value={formData?.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
              }}
              required
            />
            <PasswordEyeModes
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </label>
        </form>
        <div className="w-full card-actions">
          <button type="button" onClick={handleLogin} className="w-full btn">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export const PasswordEyeModes = ({
  showPassword,
  setShowPassword,
}: {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return showPassword ? (
    <svg
      onClick={() => setShowPassword(!showPassword)}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-eye cursor-pointer"
      viewBox="0 0 16 16"
    >
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
    </svg>
  ) : (
    <svg
      onClick={() => setShowPassword(!showPassword)}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-eye-slash cursor-pointer"
      viewBox="0 0 16 16"
    >
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
      <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
    </svg>
  );
};

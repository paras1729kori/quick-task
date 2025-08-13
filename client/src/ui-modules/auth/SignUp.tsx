import React, { useState } from "react";
import _ from "lodash";
import { toast } from "sonner";

import { useAuth } from "../../contexts/AuthProvider";
import { register } from "../../services/auth";
import type { AuthType } from "../../appTypes";

export default function SignUp({
  setCurrentAuthMode,
}: {
  setCurrentAuthMode: React.Dispatch<React.SetStateAction<AuthType>>;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { setUser } = useAuth();

  const handleLogin = async () => {
    if (_.isEmpty(formData?.name)) {
      toast.warning("Please enter your name");
      return;
    }
    if (_.isEmpty(formData?.email)) {
      toast.warning("Please enter your email");
      return;
    }
    if (_.isEmpty(formData?.password)) {
      toast.warning("Please enter a password");
      return;
    }

    const user = await register(
      formData?.name,
      formData?.email,
      formData?.password
    );
    setUser(user);
    toast.success("Here we go ✊");
  };

  return (
    <div className="card bg-base-100 w-[90%] md:w-96 shadow-md overflow-auto">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Sign Up</h2>
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
              type="text"
              className="grow validator"
              placeholder="John Doe"
              value={formData?.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
              required
            />
          </label>
          <label className="input w-full mt-2">
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
              type="search"
              className="grow"
              placeholder="********"
              value={formData?.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              required
            />
          </label>
        </form>
        <p className="text-left self-start text-xs text-gray-500">
          Must be more than 8 characters, including
          <br />
          At least one number
          <br />
          At least one lowercase letter
          <br />
          At least one uppercase letter
        </p>
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
              setCurrentAuthMode("forgot-password");
              sessionStorage.setItem("current_auth_mode", "forgot-password");
            }}
            className="link"
          >
            Forgot Password?
          </div>
        </div>
      </div>
    </div>
  );
}

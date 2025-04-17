import React, { useState } from "react";
import GoogleButton from "./GoogleButton.jsx";
import { doSignInWithGoogle, doCreateUserWithEmailAndPassword } from "../../firebase/auth.js";
import { useNavigate, Navigate } from "react-router";
import { useAuth } from "../../contexts/authContext/index.jsx";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()
  const {currentUser, userLoggedIn} = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess(false);
      return;
    }
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      navigate('/newuser');
      setError("");
      setSuccess(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setError('This email address is already being used.');
        } else {
          setError(error.message);
        }
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSuccess(false);
    }


  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
        try {
            await doSignInWithGoogle();
            navigate('/')
        } catch (error) {
            setErrorMessage(error.message);
        }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      { userLoggedIn && <Navigate to={'/'} replace={true} />}

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create Your Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-black placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-black placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-black placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && (
            <p className="text-sm text-green-600">
              Account created successfully!
            </p>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>
          <div className="w-full justify-center items-center flex flex-col">
            <p className="text-sm text-neutral-500 mb-4">OR</p>
            <GoogleButton onClick={onGoogleSignIn} text="Sign Up with Google" />
          </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {" "}
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

import { React, useState } from "react";
import Link from "next/link";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Router from "next/router";
import { useMutation, gql } from "@apollo/client";
import { resolvers as scalarResolvers } from "graphql-scalars";

const SignUp = () => {
  const [openPassword, setOpenPassword] = useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] =
    useState(false);

  const signupMutation = gql`
    mutation SignupMutation($email: EmailAddress!, $password: String!) {
      signup(email: $email, password: $password) {
        email
        password
      }
    }
  `;

  const [signup] = useMutation(signupMutation, {
    variables: {
      email: email,
      password: password,
    },
    onCompleted: ({ data }) => {
      console.log("data");
      console.log(data);
      Router.push("/login");
    },
  });

  // Show or hide password
  const togglePassword = () => {
    setOpenPassword(!openPassword);
  };

  // Show or hide confirm password
  const toggleConfirmPassword = () => {
    setOpenConfirmPassword(!openConfirmPassword);
  };

  // Check whether email is valid or not
  const isEmailValid = () => {
    // Check if email is empty or not
    if (!email) {
      console.log("Error: Email cannot be empty");
      setShowEmailError(true);
      return false;
    }

    // Check if email contains any whitespace or not
    if (/\s/.test(email)) {
      console.log("Error: Email cannot contain spaces");
      setShowEmailError(true);
      return false;
    }

    // Check if email is in correct format or not
    if (!/\S+@\S+\.\S+/.test(email)) {
      console.log("Error: Invalid email format");
      setShowEmailError(true);
      return false;
    }
    return true;
  };

  // Check whether password is valid or not
  const isPasswordValid = () => {
    // Password must be between 8-12 characters
    // Password must have at least:
    // 1 capital letter, 1 lowercase letter, 1 digit and 1 special characters (~`!@#$%^&*()_-+={[}]|\:;"'<,>.?/)
    var pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );

    // Check if password is empty or not
    if (!password) {
      console.log("Error: Password cannot be empty");
      setShowPasswordError(true);
      return false;
    }

    // Check if length of password is between 8-12 characters or not
    if (password.length < 8 || password.length > 12) {
      console.log("Error: Password must be between 8-12 characters");
      setShowPasswordError(true);
      return false;
    }

    // Check if password contains any whitespace or not
    if (/\s/.test(password)) {
      console.log("Error: Password cannot contain spaces");
      setShowPasswordError(true);
      return false;
    }

    // Check if password have at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character
    if (!pattern.test(password)) {
      console.log(
        "Error: Password must have at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character"
      );
      setShowPasswordError(true);
      return false;
    }

    return true;
  };

  // Check whether password and confirm password matches or not
  const doesPasswordsMatch = () => {
    // Check if password matches confirmPassword or not
    if (password !== confirmPassword) {
      console.log("Error: Password and Confirm Password does not match");
      setShowConfirmPasswordError(true);
      return false;
    }
    return true;
  };

  // TODO: Sign up for a new user account
  const handleSignup = (e) => {
    e.preventDefault();
    setShowEmailError(false);
    setShowPasswordError(false);
    setShowConfirmPasswordError(false);

    console.log(`email: ${email}`);
    console.log(`password: ${password}`);
    console.log(`confirmPassword: ${confirmPassword}`);

    const emailValidity = isEmailValid();
    const passwordValidity = isPasswordValid() && doesPasswordsMatch();

    // Check if email, password and confirm password are valid
    if (emailValidity && passwordValidity) {
      // Use GraphQL signup mutation to perform sign up
      // If email already exists in database, display modal to user saying
      // an account has already been created with the email address
      // Navigate to trade page
      signup();
    }
  };

  return (
    <div className="grid grid-cols-2 divide-x-2 min-h-full">
      {/* Carousel */}
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#A6A6E0] h-screen">
        {/* <div className="flex bg-[#ffffff]/80 h-5/6 rounded-lg shadow-xl">
          <Carousel></Carousel>
        </div> */}
      </div>

      {/* Sign up form */}
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white h-screen">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl text-center font-bold tracking-tight text-gray-900">
              Create a new account
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6 relative">
              <form action="#" method="POST" className="space-y-7">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter email"
                      required
                      className="placeholder:normal-case lowercase block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div
                    style={{ display: showEmailError ? "block" : "none" }}
                    className="mt-0"
                  >
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="#DC2626"
                        class="w-5 h-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <div className="text-sm text-red-600 px-2 font-medium">
                        Invalid Email
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 relative"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={openPassword === false ? "password" : "text"}
                      autoComplete="current-password"
                      placeholder="Enter password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      maxLength="12"
                      minLength="8"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {openPassword === true ? (
                        <svg
                          onClick={togglePassword}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                          <path
                            fillRule="evenodd"
                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          onClick={togglePassword}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                          <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                          <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div
                    className="rounded border-gray-300 border px-2 py-2"
                    style={{ display: showPasswordError ? "block" : "none" }}
                  >
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="#DC2626"
                        class="w-5 h-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <div className="text-sm text-red-600 px-2 font-medium">
                        Invalid Password
                      </div>
                    </div>
                    <div className="text-sm text-red-600 px-12 font-medium">
                      <ul className="list-disc">
                        <li>
                          Your password needs to include both lower case & upper
                          case
                        </li>
                        <li>At least one number or symbol</li>
                        <li>Minimum of 8 and maximum of 12 characters</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 relative"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirm_password"
                      name="confirm_password"
                      type={openConfirmPassword === false ? "password" : "text"}
                      autoComplete="current-password"
                      placeholder="Re-enter password"
                      required
                      className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      maxLength="12"
                      minLength="8"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {openConfirmPassword === true ? (
                        <svg
                          onClick={toggleConfirmPassword}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                          <path
                            fillRule="evenodd"
                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          onClick={toggleConfirmPassword}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                          <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                          <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      display: showConfirmPasswordError ? "block" : "none",
                    }}
                  >
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="#DC2626"
                        class="w-5 h-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <div className="text-sm text-red-600 px-2 font-medium">
                        Password and Confirm Password do not match
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleSignup}
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

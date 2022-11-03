import React from "react";
import { RiLockPasswordLine } from "react-icons/ri";

const ForgetPwPage = () => {
  return (
    <div className="min-h-full">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#A6A6E0] h-screen">
        <div className="flex flex-col bg-[#ffffff]/80 h-5/6 rounded-lg space-y-4 shadow-xl">
          <RiLockPasswordLine className="h-20 w-20 fill-blue-500 mx-auto my-20"></RiLockPasswordLine>
          <h1 className="text-black text-center text-4xl">Forgot password?</h1>
          <p className="text-gray-600 text-center text-lg">
            Don't worry. We'll send you the instructions.
          </p>

          <form
            action="#"
            method="POST"
            className="space-y-6 mx-auto w-full max-w-sm lg:w-96"
          >
            <div>
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
                  placeholder="Enter your email"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="text-center justify-center">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Reset my password
              </button>

              <a
                href="/home/akmal/Desktop/drc-syntrade/pages/LoginPage.js"
                className="font-medium text-indigo-600 hover:text-indigo-500 text-center"
              >
                Back to login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPwPage;

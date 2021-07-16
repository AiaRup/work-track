import React from 'react';
import { FormattedMessage } from 'react-intl';

const Login = () => {
  return (
    <div class='xs:flex'>
      <div class='lg:w-1/2 xl:max-w-screen-sm mx-auto'>
        <div class='py-12 lg:bg-white flex justify-center lg:px-12' />
        <div class='mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl'>
          <h2
            class='text-center text-4xl text-indigo-900 font-display font-semibold xl:text-5xl
            xl:text-bold'
          >
            <FormattedMessage id='login' />
          </h2>
          <div class='mt-12'>
            <form>
              <div>
                <div class='text-sm font-bold text-gray-700 tracking-wide'>
                  Email Address
                </div>
                <input
                  class='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                  type=''
                  placeholder='Email'
                />
              </div>
              <div class='mt-8'>
                <div class='flex justify-between items-center'>
                  <div class='text-sm font-bold text-gray-700 tracking-wide'>
                    Password
                  </div>
                </div>
                <input
                  class='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                  type=''
                  placeholder='Password'
                />
              </div>
              <div class='mt-10'>
                <button
                  class='bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                        font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                        shadow-lg'
                >
                  Log In
                </button>
              </div>
            </form>
            <div class='mt-12 text-sm font-display font-semibold text-gray-700 text-center'>
              Don't have an account ?
              <a class='cursor-pointer text-indigo-600 hover:text-indigo-800'>
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

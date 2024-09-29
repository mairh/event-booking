'use client';

import { LoginButton } from '../login-button';
import { LoginInput } from '../login-input';
import { useLogic } from './useLogic';

export const LoginForm = () => {
  const {
    username,
    usernameChangeHandler,
    password,
    passwordChangeHandler,
    getUsernameErrors,
    getPasswordErrors,
    getRequestError,
    handleSubmit,
    isPending,
  } = useLogic();

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Sign In
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center"
      >
        <LoginInput
          label="Username"
          name="username"
          value={username}
          type="text"
          onChange={usernameChangeHandler}
        />
        <div className="h-5 w-full sm:max-w-xs md:max-w-md max-w-lg">
          {getUsernameErrors()}
        </div>

        <LoginInput
          label="Password"
          name="password"
          value={password}
          type="password"
          onChange={passwordChangeHandler}
        />
        <div className="h-[100px] w-full sm:max-w-xs md:max-w-md max-w-lg">
          {getPasswordErrors()}
        </div>

        <LoginButton showSpinner={isPending} />
      </form>

      <div className="mt-4 h-5">{getRequestError()}</div>
    </div>
  );
};

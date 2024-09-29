import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useEffect, useState, useTransition } from 'react';

import { settings } from '@/modules/common';

import { validateLoginInput } from '../../utils';

export const useLogic = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string[]>([]);
  const [passwordError, setPasswordError] = useState<string[]>([]);
  const [requestError, setRequestError] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const resetErrors = () => {
    setRequestError('');
    setUsernameError([]);
    setPasswordError([]);
  };

  const usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const redirectToHomePage = () => {
    if (settings.app.port !== settings.app.adminPort) {
      router.push('/home');
    }

    if (settings.app.port === settings.app.adminPort) {
      router.push('/admin-panel/users');
    }
  };

  const login = async () => {
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (result?.ok) {
      redirectToHomePage();
    }

    if (result?.error) {
      setRequestError(result.error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    resetErrors();

    const validation = validateLoginInput({ username, password });

    if (validation?.errors?.username) {
      setUsernameError(validation.errors.username);

      return;
    }

    if (validation?.errors?.password) {
      setPasswordError(validation.errors.password);

      return;
    }

    startTransition(async () => {
      await login();
    });
  };

  const getUsernameErrors = () => {
    return (
      Boolean(usernameError.length) &&
      usernameError.map((error) => (
        <p key={error} className="text-red-500 text-xs pl-1">
          {error}
        </p>
      ))
    );
  };

  const getPasswordErrors = () => {
    return (
      Boolean(passwordError.length) && (
        <p key={passwordError[0]} className="text-red-500 text-xs pl-1">
          {passwordError[0]}
        </p>
      )
    );
  };

  const getRequestError = () => {
    return requestError && <p className="text-red-500">{requestError}</p>;
  };

  useEffect(() => {
    if (usernameError.length > 0) {
      setUsernameError([]);
    }
  }, [username]);

  useEffect(() => {
    if (passwordError.length > 0) {
      setPasswordError([]);
    }
  }, [password]);

  return {
    username,
    usernameChangeHandler,
    password,
    passwordChangeHandler,
    getUsernameErrors,
    getPasswordErrors,
    getRequestError,
    handleSubmit,
    isPending,
  };
};

import { LoginButtonProps } from './types';

export const LoginButton = (props: LoginButtonProps) => {
  const { showSpinner } = props;

  const getButtonText = () => {
    if (!showSpinner) {
      return 'Login';
    }

    return <span className="loading loading-spinner" />;
  };

  return (
    <button className="btn btn-wide" type="submit">
      {getButtonText()}
    </button>
  );
};

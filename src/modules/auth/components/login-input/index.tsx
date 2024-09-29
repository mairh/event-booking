import { LoginInputProps } from './types';

export const LoginInput = (props: LoginInputProps) => {
  const { label, name, value, type, onChange } = props;

  return (
    <label
      htmlFor={`${name}Input`}
      className="form-control w-full sm:max-w-xs md:max-w-md max-w-lg"
    >
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        id={`${name}Input`}
        className="input input-bordered w-full sm:max-w-xs md:max-w-md max-w-lg"
        name={name}
        value={value}
        type={type}
        onChange={onChange}
      />
    </label>
  );
};

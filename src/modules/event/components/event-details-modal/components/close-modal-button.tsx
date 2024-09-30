import { CloseModalButtonProps } from './types';

export const CloseModalButton = (props: CloseModalButtonProps) => {
  const { onClose } = props;

  return (
    <button
      className="btn btn-sm btn-circle glass absolute right-2 top-2 z-20"
      onClick={onClose}
      onMouseDown={(e) => e.preventDefault()}
    >
      ✕
    </button>
  );
};

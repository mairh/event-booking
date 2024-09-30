import { EventDetailsModalProps } from '../types';

export type ModalImageProps = {
  image: {
    asset: {
      [key: string]: string;
    };
    alt?: string;
  };
};

export type CloseModalButtonProps = Pick<EventDetailsModalProps, 'onClose'>;

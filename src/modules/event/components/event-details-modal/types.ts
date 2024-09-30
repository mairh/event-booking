import { Event } from '../../types';

export type EventDetailsModalProps = {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
};

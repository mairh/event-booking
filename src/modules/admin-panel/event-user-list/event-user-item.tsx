import {
  EventDetailsModal,
  EventsCardWrapper,
  ViewDetailsButton,
} from '@/modules/event';
import { useModal } from '@/modules/event/hooks';
import { Event } from '@/modules/event/types';

export type EventUserItemProps = {
  event: Event;
};

export const EventUserItem = (props: EventUserItemProps) => {
  const { event } = props;

  const { openModal, closeModal, showModal } = useModal();

  return (
    <>
      <EventsCardWrapper event={event}>
        <ViewDetailsButton onClick={openModal} isAdminPanel />
      </EventsCardWrapper>

      {showModal && (
        <EventDetailsModal
          event={event}
          isOpen={showModal}
          onClose={closeModal}
        />
      )}
    </>
  );
};

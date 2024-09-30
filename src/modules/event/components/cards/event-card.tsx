'use client';

import { useModal } from '../../hooks';
import { AddToScheduleButton, ViewDetailsButton } from '../buttons';
import { EventDetailsModal } from '../event-details-modal';
import { CardWrapper, CardWrapperAdmin } from './card-wrapper';
import { EventCardProps } from './types';

export const EventCard = (props: EventCardProps) => {
  const { event, scheduleIds, isAdminPanel, userId } = props;
  const { showModal, openModal, closeModal } = useModal();

  if (isAdminPanel) {
    return (
      <>
        <CardWrapperAdmin event={event}>
          <AddToScheduleButton
            eventId={event.id}
            scheduleIds={scheduleIds}
            isAdminPanel={isAdminPanel}
            userId={userId}
          />
          <ViewDetailsButton onClick={openModal} isAdminPanel={isAdminPanel} />
        </CardWrapperAdmin>

        {showModal && (
          <EventDetailsModal
            event={event}
            isOpen={showModal}
            onClose={closeModal}
          />
        )}
      </>
    );
  }

  return (
    <>
      <CardWrapper event={event}>
        <AddToScheduleButton eventId={event.id} scheduleIds={scheduleIds} />
        <ViewDetailsButton onClick={openModal} />
      </CardWrapper>

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

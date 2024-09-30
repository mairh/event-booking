'use client';

import { useModal } from '../../hooks';
import { DeleteFromScheduleButton, ViewDetailsButton } from '../buttons';
import { EventDetailsModal } from '../event-details-modal';
import { CardWrapper, CardWrapperAdmin } from './card-wrapper';
import { ScheduleCardProps } from './types';

export const ScheduleCard = (props: ScheduleCardProps) => {
  const { event, isAdminPanel, userId } = props;
  const { showModal, openModal, closeModal } = useModal();

  if (isAdminPanel) {
    return (
      <>
        <CardWrapperAdmin event={event}>
          <DeleteFromScheduleButton
            eventId={event.id}
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
        <DeleteFromScheduleButton eventId={event.id} />
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

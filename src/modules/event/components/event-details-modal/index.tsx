'use client';

import { CalendarIcon, PinIcon } from '@sanity/icons';

import { CloseModalButton, ModalImage } from './components';
import { EventDetailsModalProps } from './types';
import { useLogic } from './useLogic';

export const EventDetailsModal = (props: EventDetailsModalProps) => {
  const { event, onClose } = props;
  const { modalStyles, eventStart, eventEnd } = useLogic(props);

  return (
    <dialog id="my_modal_3" className={modalStyles()}>
      <div className="modal-box w-11/12 sm:w-[600px] h-[450px]">
        <form method="dialog">
          <CloseModalButton onClose={onClose} />
        </form>

        <div className="w-full h-full absolute top-0 left-0 flex flex-col">
          <div className="w-full h-[150px] relative skeleton rounded-b-none">
            {event.coverImage && <ModalImage image={event.coverImage} />}
          </div>
          <div className="flex flex-col my-5 mx-6">
            <h2 className="card-title text-3xl">{event.title}</h2>
            <div className="flex flex-col mt-5">
              <div className="flex items-center">
                <CalendarIcon
                  width={30}
                  height={30}
                  className="text-zinc-500"
                />
                <p className="pl-2.5 text-md text-zinc-500">
                  {eventStart} - {eventEnd}
                </p>
              </div>
              <div className="flex items-center mt-2.5">
                <PinIcon width={30} height={30} className="text-zinc-500" />
                <p className="pl-2.5 text-md text-zinc-500">{event.location}</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-lg">{event.description}</p>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

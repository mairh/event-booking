import { ScheduleIds } from '../../types';

export type EventButtonProps = {
  onClick: () => void;
  title: string;
  isDisabled?: boolean;
  showSpinner?: boolean;
};

export type ViewDetailsButtonProps = {
  onClick: () => void;
  isAdminPanel?: boolean;
};

export type AddToScheduleButtonProps = DeleteFromScheduleButtonProps &
  ScheduleIds;

export type DeleteFromScheduleButtonProps = {
  eventId: string;
  isAdminPanel?: boolean;
  userId?: string;
};

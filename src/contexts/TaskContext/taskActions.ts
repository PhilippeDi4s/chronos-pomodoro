import type { TaskModel } from '../../Models/TaskModel';
import type { TaskStateModel } from '../../Models/TaskStateModel';

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  RESET_STATE: 'RESET_STATE',
  COUNT_DOWN: 'COUNT_DOWN',
  COMPLET_TASK: 'COMPLET_TASK',
  CHANGE_TASK: 'CHANGE_TASK',
} as const;

export type TaskActionPayload =
  | {
      type: typeof TaskActionTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: typeof TaskActionTypes.COUNT_DOWN;
      payload: { secondsRemaining: number };
    }
  | {
      type: typeof TaskActionTypes.CHANGE_TASK;
      payload: TaskStateModel['config'];
    }
  | {
      type: typeof TaskActionTypes.RESET_STATE;
      payload: TaskStateModel['config'];
    };

export type TaskActionWithoutPayload =
  | {
      type: typeof TaskActionTypes.INTERRUPT_TASK;
    }
  | {
      type: typeof TaskActionTypes.COMPLET_TASK;
    };

export type TaskActionModel = TaskActionPayload | TaskActionWithoutPayload;

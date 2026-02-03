import type { TaskStateModel } from '../../Models/TaskStateModel';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { initialTaskState } from './initialTaskState';
import { TaskActionTypes, type TaskActionModel } from './taskActions';

export function taskReducer(state: TaskStateModel, action: TaskActionModel) {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const nextCicle = getNextCycle(state.currentCycle);
      const secondesRemainig = newTask.duration * 60;

      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCicle,
        secondesRemainig,
        formatedSecondsRemaining: formatSecondsToMinutes(secondesRemainig),
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondesRemainig: 0,
        formatedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.RESET_STATE: {
      return {
        ...initialTaskState,
        config: {...action.payload},
      };
    }
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondesRemainig: action.payload.secondsRemaining,
        formatedSecondsRemaining: formatSecondsToMinutes(
          action.payload.secondsRemaining,
        ),
      };
    }
    case TaskActionTypes.COMPLET_TASK: {
      return {
        ...state,
        activeTask: null,
        secondesRemainig: 0,
        formatedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.CHANGE_TASK: {
      return {
        ...state,
        config: { ...action.payload },
      };
    }
  }
  return state;
}

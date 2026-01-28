import type { TaskStateModel } from "../../Models/TaskStateModel";

export const initialTaskState: TaskStateModel = {
  tasks: [],
  secondesRemainig: 0,
  formatedSecondsRemaining: '00:00',
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 0.1,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};
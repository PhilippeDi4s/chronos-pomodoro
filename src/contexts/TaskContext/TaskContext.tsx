import { createContext } from "react";
import type { TaskStateModel } from "../../Models/TaskStateModel";
import { initialTaskState } from "./initialTaskState";
import type { TaskActionModel } from "./taskActions";

export type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>;
};

export const initialContextValue = {
  state: initialTaskState,
  dispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);

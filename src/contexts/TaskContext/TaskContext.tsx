import { createContext } from "react";
import type { TaskStateModel } from "../../Models/TaskStateModel";
import { initialTaskState } from "./initialTaskState";

export type TaskContextProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

export const initialContextValue = {
  state: initialTaskState,
  setState: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);

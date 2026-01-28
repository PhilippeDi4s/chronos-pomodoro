import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();
  const nextCicle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCicle);

  const tipsForWhenActiveTask = {
    workTime: <span>Foque por {state.config.workTime}min</span>,
    shortBreakTime: (
      <span>Descanso curto {state.config.shortBreakTime}min</span>
    ),
    longBreakTime: <span>Descanso Longo {state.config.longBreakTime}min</span>,
  };

  const tipsForNoActiveTask = {
    workTime: <span>Próximo ciclo é de {state.config.workTime}min</span>,
    shortBreakTime: (
      <span>
        Próximo ciclo é um descanso de {state.config.shortBreakTime}min
      </span>
    ),
    longBreakTime: (
      <span>
        Próximo ciclo é um descanso de {state.config.longBreakTime}min
      </span>
    ),
  };

  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}

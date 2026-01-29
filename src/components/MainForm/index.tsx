// import style from './style.module.css'
import { useRef } from 'react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import type { TaskModel } from '../../Models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  const nextCicle = getNextCycle(state.currentCycle);
  const nextCicleType = getNextCycleType(nextCicle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn('Digite o nome da Tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCicleType],
      type: nextCicleType,
    };

    showMessage.success('Tarefa ' + newTask.name + ' iniciada');

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
  }

  function handleInterruptTask() {
    showMessage.error('Tarefa cancelada');
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='formRow'>
        <DefaultInput
          id='meuInput'
          type='texte'
          labelText='Task'
          // required
          placeholder='Digite sua tarefa'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>

      <div className='formRow'>
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask && (
          <DefaultButton
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
            key={'btn_submit'}
          />
        )}{' '}
        {!!state.activeTask && (
          <DefaultButton
            onClick={handleInterruptTask}
            color='red'
            type='button'
            icon={<StopCircleIcon />}
            key={'btn_button'}
          />
        )}
      </div>
    </form>
  );
}

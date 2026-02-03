import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';

import styles from './style.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { useEffect, useMemo, useState } from 'react';
import { MainTemplate } from '../../components/templates/MainTemplate';
import { showMessage } from '../../adapters/showMessage';
import { ConfirmModal } from '../../components/ConfirmModal';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

export function History() {
  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro';
  }, []);

  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;

const [sortConfig, setSortConfig] = useState({
  field: 'startDate' as SortTasksOptions['field'],
  direction: 'desc' as SortTasksOptions['direction'],
});


const sortedTasks = useMemo(() => {
  return sortTasks({
    tasks: state.tasks,
    field: sortConfig.field,
    direction: sortConfig.direction,
  });
}, [state.tasks, sortConfig]);



  const [isModalOpen, setModalOpen] = useState(false);


function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
  setSortConfig(prev => ({
    field,
    direction: prev.direction === 'desc' ? 'asc' : 'desc',
  }));
}


  function handelResetHistory() {
    showMessage.dismiss();
    setModalOpen(true);
  }

  function confirmModal() {
    const configs = localStorage.getItem('state');

    const configsParsed = configs ? JSON.parse(configs) : null;

    dispatch({
      type: TaskActionTypes.RESET_STATE,
      payload: configsParsed.config,
    });
    showMessage.success('Histórico deletado com sucesso!');
    setModalOpen(false);
  }

  function cancelModal() {
    setModalOpen(false);
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>

          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar todo o histórico'
                title='Apagar histórico'
                onClick={handelResetHistory}
              />
            </span>
          )}
          <ConfirmModal
            isOpen={isModalOpen}
            question='Tem certeza que deseja apagar seu histórico?'
            onConfirm={confirmModal}
            onCancel={cancelModal}
          />
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasks({ field: 'name' })}
                    className={styles.thSort}
                  >
                    Tarefa ↕
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'duration' })}
                    className={styles.thSort}
                  >
                    Duração ↕
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                    className={styles.thSort}
                  >
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                {sortedTasks.map(task => {
                  const taskTypeDictionary = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso curto',
                    longBreakTime: 'Descanso longo',
                  };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!hasTasks && (
          <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Ainda não existem tarefas criadas
          </p>
        )}
      </Container>
    </MainTemplate>
  );
}

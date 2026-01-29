import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import styles from './styles.module.css';

type ConfirmModalProps = {
    question: string;
    textSuccess: string;
}

export function ConfirmModal({question, textSuccess}: ConfirmModalProps) {
  const { dispatch } = useTaskContext();

  function handelResetHistoryTrue() {
    showMessage.dismiss();
    dispatch({ type: TaskActionTypes.RESET_STATE });
    showMessage.success(textSuccess);
  }

  function handelResetHistoryFalse() {
    showMessage.dismiss();
  }

    showMessage.warning(
      <div className={styles.toastConfirmContainer}>
        <span className={styles.toastConfirmText}>
          {question}
        </span>

        <div className={styles.toastConfirmActions}>
          <button
            onClick={handelResetHistoryTrue}
            className={`${styles.toastBtn} ${styles.toastBtnConfirm}`}
          >
            Ok
          </button>
          <button
            onClick={handelResetHistoryFalse}
            className={`${styles.toastBtn} ${styles.toastBtnCancel}`}
          >
            Cancelar
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
      },
    );
  return null; 
}
import { XIcon } from 'lucide-react';
import style from './styles.module.css';

type ConfirmModalProps = {
  isOpen: boolean;
  question: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  isOpen,
  question,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className={style.overlay} onClick={onCancel}>
      <div className={style.modal} onClick={e => e.stopPropagation()}>
        <div className={style.modal_header}>
          <XIcon className={style.Xicon} onClick={onCancel} />
        </div>
        <div className={style.modal_question}>
          <p>{question}</p>
        </div>
        <div className={style.modalConfirmActions}>
          <button
            className={`${style.toastBtnConfirm} ${style.toastBtn}`}
            onClick={onConfirm}
          >
            Ok
          </button>
          <button
            className={`${style.toastBtnCancel} ${style.toastBtn}`}
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

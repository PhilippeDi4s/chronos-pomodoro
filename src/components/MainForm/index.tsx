// import style from './style.module.css'
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';

export function MainForm() {
  return (
    <form className='form' action=''>
      <div className='formRow'>
        <DefaultInput
          id='meuInput'
          type='texte'
          labelText='teste'
          required
          placeholder='Digite sua tarefa'
        />
      </div>

      <div className='formRow'>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>

      <div className='formRow'>
        <Cycles />
      </div>

      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} />
        <DefaultButton icon={<StopCircleIcon />} />
      </div>
    </form>
  );
}

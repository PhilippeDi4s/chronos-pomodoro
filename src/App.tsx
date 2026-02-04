import './styles/theme.css';
import './styles/global.css';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MessagesContainer } from './components/MessageContainer';
import { MainRouter } from './routers/MainRouter';
import { RouteCleaner } from './components/RouteCleaner';
import { BrowserRouter} from 'react-router-dom';


export function App() {
  return (
    <BrowserRouter>
      <TaskContextProvider>
        <MessagesContainer>
          <RouteCleaner />
          <MainRouter />
        </MessagesContainer>
      </TaskContextProvider>
    </BrowserRouter>
  );
}

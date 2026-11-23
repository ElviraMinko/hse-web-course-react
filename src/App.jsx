import { Route, Routes } from 'react-router-dom';
import { BoardPage } from './pages/BoardPage/BoardPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { TaskFormPage } from './pages/TaskFormPage/TaskFormPage';
import { TaskPage } from './pages/TaskPage/TaskPage';
import { TeamPage } from './pages/TeamPage/TeamPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardPage />} />
      <Route path="/tasks/new" element={<TaskFormPage />} />
      <Route path="/tasks/:id" element={<TaskPage />} />
      <Route path="/tasks/:id/edit" element={<TaskFormPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

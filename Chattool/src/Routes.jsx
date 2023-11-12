import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';

const RoutesConfig = ({ username }) => (
  <Routes>
    <Route path="/chat/:roomName" element={<Chat username={username} />} />
    <Route path="/*" element={<Navigate to="/" />} />
  </Routes>
);

export default RoutesConfig;

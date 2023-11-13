import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';

const RoutesConfig = ({ username }) => (
  <Routes>
    <Route path="/*" element={<Navigate to="/" />} />

    <Route path="/chat/:roomName" element={<Chat username={username} />} />
  </Routes>
);

export default RoutesConfig;

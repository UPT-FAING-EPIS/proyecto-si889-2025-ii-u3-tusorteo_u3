import { logoutUser } from '../services/authService';

export function useLogout() {
  const logout = async () => {
    try {
      const { error } = await logoutUser();
      if (error) {
        console.error('Error al cerrar sesión:', error);
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return { logout };
}
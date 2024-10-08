/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, ReactNode, Dispatch, SetStateAction, useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios-instance';
import { useUser } from './user-provider';
import { useQuery } from '@tanstack/react-query';

// Define a type for notifications
interface Notification {
  _id: string;
  message: string;
  postId?: any; 
}

const NotificationContext = createContext<{
  notifications: Notification[];
  loading: boolean;
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
  clearNotification: () => Promise<void>;
}>({
  notifications: [],
  loading: true,
  setNotifications: () => {},
  clearNotification: async () => {}, 
});

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  

  const [notifications, setNotifications] = useState<Notification[]>([]); 


  const { data, isLoading: loading } = useQuery<Notification[]>({
    queryKey: ['notifications', user?._id],
    queryFn: async () => {
      if (!user?._id) return [];
      const response = await axiosInstance(`/notifications/${user._id}`);
      return response.data.data;
    },
    enabled: !!user?._id,
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (data) {
    
      setNotifications(data);
    }
  }, [data]);

  const clearNotification = async () => {
    try {
      if (notifications.length > 0) {
        await axiosInstance.delete(`/notifications/${user?._id}/${notifications[0]._id}`);
      }
      setNotifications([]); 
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, loading, setNotifications, clearNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);

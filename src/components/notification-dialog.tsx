
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import Link from 'next/link';

interface Notification {
  _id: string; 
  message: string;
  postId?: any; 
}

interface NotificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  clearNotification: (_id: string) => void; 
}

export const NotificationDialog = ({
    isOpen,
    onClose,
    notifications,
    clearNotification,
  }: NotificationDialogProps) => {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full mx-auto justify-center max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-black">Notifications</DialogTitle>
          </DialogHeader>
          <div>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="p-2 border-b last:border-none text-black hover:bg-gray-100 transition flex justify-between items-center"
                >
                  {notification.postId ? (
                    <Link href={`/post-details/${notification.postId._id}`}>
                      <p className="block">{notification.message}</p>
                    </Link>
                  ) : (
                    <p>{notification.message}</p>
                  )}
                  <button
                    onClick={() => clearNotification(notification._id)}
                    className="text-red-500 ml-2"
                  >
                    ✖
                  </button>
                </div>
              ))
            ) : (
              <p className="text-black">No notifications</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  

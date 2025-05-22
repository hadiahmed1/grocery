import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import useUser from '../hooks/useUser';

interface pusherData {
    notification: string;
}

const Notification = () => {
    const { user } = useUser();
    const pusherKey = import.meta.env.VITE_PUSHER_KEY || "";
    const [notifications, setNotifications] = useState<string[]>([]);
    useEffect(() => {
        const pusher = new Pusher(pusherKey, {
            cluster: 'ap2',
        });

        const channel = pusher.subscribe(user?.id || "");
        channel.bind('notification', function (data: pusherData) {
            console.log('Received message:', data);
            setNotifications([data.notification, ...notifications])
        });

    }, [pusherKey, user?.id, notifications]);

    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block">
            <button onClick={() => setOpen(!open)} className="relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="yellow"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-bell"
                >
                    <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                    <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                </svg>
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-yellow-300 flex justify-center items-center text-gray-800 text-xs">
                    {notifications.length}
                </span>
            </button>

            {open && (
                <ul className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-200 rounded-md shadow-lg z-10 max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <li className="p-3 text-sm text-gray-100">No notifications</li>
                    ) : (
                        notifications.map((notification, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 text-sm text-gray-100"
                            >
                                {notification}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default Notification;

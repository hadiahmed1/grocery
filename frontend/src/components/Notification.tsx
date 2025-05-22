import { useEffect } from 'react';
import Pusher from 'pusher-js';
import useUser from '../hooks/useUser';

const Notification = () => {
    const { user } = useUser();
    const pusherKey = import.meta.env.VITE_PUSHER_KEY || "";
    console.log("Pusher Key:", pusherKey)
    useEffect(() => {
        // Initialize Pusher
        const pusher = new Pusher(pusherKey, {
            cluster: 'ap2',
        });

        // Subscribe to public channel
        const channel = pusher.subscribe(user?.id || "");
        console.log(user?.id)
        // Bind to event
        channel.bind('notification', function (data: object) {
            console.log('Received message:', data);
            // You could update state here to display messages
        });

        // Cleanup on unmount
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    return <div>Listening for chat messages...</div>;
};

export default Notification;

import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_ID || "",
  key: process.env.PUSHER_KEY || "",
  secret: process.env.PUSHER_SECRET || "",
  cluster: "ap2",
  useTLS: true
});

export default Pusher;

const sendRandomNotification = () =>{
    let i =0;
    setInterval(()=>{
        console.log("sending notif"+i++)
        pusher.trigger("my-channel", "my-event", {
          message: "hello world"+i
        });

    },10000)
}

export {sendRandomNotification};
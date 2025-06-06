import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_ID || "",
  key: process.env.PUSHER_KEY || "",
  secret: process.env.PUSHER_SECRET || "",
  cluster: "ap2",
  useTLS: true
});

export default pusher;
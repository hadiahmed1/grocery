import { Op } from 'sequelize';
import Order from '../models/order.model';
import cron from 'node-cron';
// import pusher from '../config/pusherConfig';
// import orderSummary from './orderSummary';

cron.schedule('* * * * *', async () => {
    try {
        const now = new Date();
        const ordersToUpdate = await Order.findAll(
            {
                where: {
                    status: 'ordered',
                    delivery_date: {
                        [Op.lte]: now
                    }
                }
            }
        );
        //updating them
        const [count] = await Order.update(
            { status: 'delivered', isPaid: true },
            {
                where: {
                    status: 'ordered',
                    delivery_date: {
                        [Op.lte]: now
                    }
                }
            }
        );

        if (count > 0) {
            console.log(`[CRON] Marked ${count} order(s) as delivered at ${now.toISOString()}`);
        }

        // ordersToUpdate.forEach(async order => {
        //     // try {
        //     //     await pusher.trigger(`${order.user_id}`, 'notification', {
        //     //         notification: await orderSummary(order.id)
        //     //     });

        //     // } catch (error) {
        //     //     console.log("error while sending notificaion");
        //     //     console.log(error);
        //     // }
        // })
    } catch (err) {
        console.error('[CRON] Failed to update orders:', err);
    }
});

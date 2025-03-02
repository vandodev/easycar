import serviceRide from "../services/service.ride.js";

async function List(req, res) {

    try {

        const passenger_user_id = req.query.passenger_user_id;
        const pickup_date = req.query.pickup_date;
        const ride_id = req.query.ride_id;
        const driver_user_id = req.query.driver_user_id;
        const status = req.query.status;

        const rides = await serviceRide.List(passenger_user_id, pickup_date,
            ride_id, driver_user_id, status);

        res.status(200).json(rides);
    } catch (error) {
        res.status(500).json({ error });
    }
}


async function Insert(req, res) {

    try {
        const passenger_user_id = req.body.passenger_user_id;
        const pickup_address = req.body.pickup_address;
        const pickup_latitude = req.body.pickup_latitude;
        const pickup_longitude = req.body.pickup_longitude;
        const dropoff_address = req.body.dropoff_address;

        const rides = await serviceRide.Insert(passenger_user_id, pickup_address,
            pickup_latitude, pickup_longitude, dropoff_address);

        res.status(201).json(rides);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export default { List, Insert };
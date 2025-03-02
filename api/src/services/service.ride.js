import repositoryRide from "../repositories/repository.ride.js";

async function List(passenger_user_id, pickup_date, ride_id, driver_user_id, status) {

    const rides = await repositoryRide.List(passenger_user_id, pickup_date,
        ride_id, driver_user_id, status);

    return rides;
}

async function Insert(passenger_user_id, pickup_address,
    pickup_latitude, pickup_longitude, dropoff_address) {

    const ride = await repositoryRide.Insert(passenger_user_id, pickup_address,
        pickup_latitude, pickup_longitude, dropoff_address);

    return ride;
}

export default { List, Insert };
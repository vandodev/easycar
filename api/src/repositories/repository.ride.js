import { execute } from "../database/sqlite.js";

async function List(passenger_user_id, pickup_date, ride_id, driver_user_id, status) {

    let filtro = [];

    let sql = `select r.*, u.name as passenger_name, u.phone as passenger_phone,
                d.name as driver_name, d.phone as driver_phone
    from rides r
    join users u on (u.user_id = r.passenger_user_id)
    left join users d on (d.user_id = r.driver_user_id)
    where r.ride_id > 0 `

    if (passenger_user_id) {
        sql = sql + " and r.passenger_user_id = ? ";
        filtro.push(passenger_user_id);
    }

    if (pickup_date) {
        sql = sql + " and r.pickup_date = ? ";
        filtro.push(pickup_date);
    }

    if (ride_id) {
        sql = sql + " and r.ride_id = ? ";
        filtro.push(ride_id);
    }

    if (driver_user_id) {
        sql = sql + " and r.driver_user_id = ? ";
        filtro.push(driver_user_id);
    }

    if (status) {
        sql = sql + " and r.status = ? ";
        filtro.push(status);
    }

    const rides = await execute(sql, filtro);
    return rides;
}

async function Insert(passenger_user_id, pickup_address,
    pickup_latitude, pickup_longitude, dropoff_address) {

    let sql = `insert into rides(passenger_user_id, pickup_address,
        pickup_latitude, pickup_longitude, dropoff_address, pickup_date, status)
        values(?, ?, ?, ?, ?, CURRENT_DATE, 'P') returning ride_id`;

    const ride = await execute(sql, [passenger_user_id, pickup_address,
        pickup_latitude, pickup_longitude, dropoff_address]);

    return ride[0];
}

async function Delete(ride_id) {

    let sql = `delete from rides where ride_id = ?`;

    await execute(sql, [ride_id]);

    return { ride_id }
}

async function Finish(ride_id, passenger_user_id) {

    let sql = `update rides set status = 'F' where ride_id = ? and passenger_user_id = ?`;

    await execute(sql, [ride_id, passenger_user_id]);

    return { ride_id }
}

export default { List, Insert, Delete, Finish };
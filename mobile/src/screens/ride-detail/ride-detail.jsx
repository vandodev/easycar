import { useState, useEffect } from "react";
import { Text, TextInput, View } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { styles } from "./ride-detail.style.js";
import icons from "../../constants/icons.js";


function RideDetail(props) {

    const rideId = props.route.params.rideId;
    const userId = props.route.params.userId;
    const [title, setTitle] = useState("");
    const [ride, setRide] = useState({});

    const [myLocation, setMyLocation] = useState({
        latitude: 20,
        longitude: 20
    });

    async function RequestRideDetail() {

        // Acessa dados na API... 
        
        const response = {
            ride_id: 1,
            passenger_user_id: 1,
            passenger_name: "Evandro Oliveira",
            passenger_phone: "(11) 99999-9999",
            pickup_address: "Praça Charles Miller - Pacaembu",
            pickup_date: "2025-02-19",
            pickup_latitude: "-23.543132",
            pickup_longitude: "-46.665389",
            dropoff_address: "Shopping Center Norte",
            status: "P",
            driver_user_id: null,
            driver_name: null,
            driver_phone: null
        }      

       
        if (response.passenger_name) {
            setTitle(response.passenger_name + " - " + response.passenger_phone);
            setRide(response);
        }

    }

    useEffect(() => {
        RequestRideDetail();
    }, []);


    return <View style={styles.container}>
        <MapView style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={{
                latitude: Number(ride.pickup_latitude),
                longitude: Number(ride.pickup_longitude),
                latitudeDelta: 0.004,
                longitudeDelta: 0.004
            }}
        >
            <Marker coordinate={{
              latitude: Number(ride.pickup_latitude),
              longitude: Number(ride.pickup_longitude),
            }}
                title={ride.passenger_name}
                description={ride.pickup_address}
                image={icons.location}
                style={styles.marker}
            />

        </MapView>
        <View style={styles.footer}>
            <View style={styles.footerText}>
                <Text>{title}</Text>
            </View>

            <View style={styles.footerFields}>
                <Text>Origem</Text>
                <TextInput style={styles.input}
                    value={ride.pickup_address}
                    editable={false} 
                />
            </View>

            <View style={styles.footerFields}>
                <Text>Destino</Text>
                <TextInput style={styles.input}
                    value={ride.dropoff_address}
                    editable={false}
                />
            </View>
        </View>
        <MyButton text="ACEITAR" />
    </View>
}

export default RideDetail;
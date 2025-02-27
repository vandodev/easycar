import { useState, useEffect } from "react";
import { Text, TextInput, View, ActivityIndicator } from "react-native";
import { styles } from "./passenger.style.js";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import icons from "../../constants/icons.js";
import {
    getCurrentPositionAsync,
    requestForegroundPermissionsAsync,
    reverseGeocodeAsync
} from "expo-location";

function Passenger(props) {
   
    const userId = 1; // id. do usuario logado no app (vem do login)
    const [title, setTitle] = useState("");
    const [myLocation, setMyLocation] = useState("");
    const [status, setStatus] = useState("");
    const [pickupAddress, setPickupAddress] = useState("");
    const [dropoffAddress, setDropoffAddress] = useState("");
    const [rideId, setRideId] = useState(0);
    const [driverName, setDriverName] = useState("");

    async function RequestRideFromUser() {
        // Acessa dados na API... 

        // const response = {};   
        
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
            status: "A",
            driver_user_id: 2,
            driver_name: "João Martins",
            driver_phone: "(11) 5555-5555"
        }

        return response;
    }

    async function RequestAddressName(lat, long) {
        const response = await reverseGeocodeAsync({
            latitude: lat,
            longitude: long
        });

        if (response[0].street && response[0].streetNumber && response[0].district) {
            setPickupAddress(response[0].street + ", " +
                response[0].streetNumber + " - " +
                response[0].district);
        }
        // console.log(response)
    }

    async function LoadScreen() {
        // buscar dados de corrida aberta na API para o usuario...
        const response = await RequestRideFromUser();

        if (!response.ride_id) {

            const location = { latitude: -23.561747, longitude: -46.656244 };
            // const location = await RequestPermissionAndGetLocation();

            if (location.latitude) {
                setTitle("Encontre a sua carona agora");
                setMyLocation(location);
                RequestAddressName(location.latitude, location.longitude);
            } else {
                Alert.alert("Não foi possível obter sua localização")
            }

        } else {           
            setTitle(response.status == "P" ? "Aguardando uma carona..." : "Carona confirmada");
            setMyLocation({
                latitude: Number(response.pickup_latitude),
                longitude: Number(response.pickup_longitude)
            });
            setPickupAddress(response.pickup_address);
            setDropoffAddress(response.dropoff_address);
            setStatus(response.status);
            setRideId(response.ride_id);
            setDriverName(response.driver_name + " - " + response.driver_phone);         
        }
    }

    async function RequestPermissionAndGetLocation() {

        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            const currentPosition = await getCurrentPositionAsync();

            if (currentPosition.coords)
                return currentPosition.coords;
            else
                return {};
        } else {
            return {};
        }
    }

    async function AskForRide() {
        const json = {
            passenger_id: userId,
            pickup_address: pickupAddress,
            dropoff_address: dropoffAddress,
            pickup_latitude: myLocation.latitude,
            pickup_longitude: myLocation.longitude
        }

        console.log("Fazer POSt para o servidor: ", json);

        props.navigation.goBack();
    }

    async function CancelRide() {
        const json = {
            passenger_user_id: userId,
            ride_id: rideId
        };

        console.log("Cancelar carona", json);
        props.navigation.goBack();
    }

    async function FinishRide() {
        const json = {
            passenger_user_id: userId,
            ride_id: rideId
        };

        console.log("Finalizar carona", json);

        props.navigation.goBack();
    }

    useEffect(() => {
        LoadScreen();
    }, []);

    return <View style={styles.container}>
        {myLocation.latitude ? <>
            <MapView style={styles.map}
                provider={PROVIDER_DEFAULT}
                initialRegion={{
                    latitude: myLocation.latitude,
                    longitude: myLocation.longitude,
                    latitudeDelta: 0.004,
                    longitudeDelta: 0.004
                }}
            >
                <Marker coordinate={{
                    latitude: myLocation.latitude,
                    longitude: myLocation.longitude
                }}
                    title="Evandro Oliveira"
                    description="Av. Paulista, 1568"
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
                    <TextInput style={styles.input} value={pickupAddress}
                        onChangeText={(text) => setPickupAddress(text)}
                        editable={status == "" ? true : false} 
                     />
                </View>

                <View style={styles.footerFields}>
                    <Text>Destino</Text>
                    <TextInput style={styles.input} value={dropoffAddress}
                        onChangeText={(text) => setDropoffAddress(text)}
                        editable={status == "" ? true : false} 
                    />
                </View>

                {
                    status == "A" && <View style={styles.footerFields}>
                        <Text>Motorista</Text>
                        <TextInput style={styles.input} value={driverName}
                            editable={false} />
                    </View>
                }

            </View>       
        </> 
        
        :   <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>        
        }
        
        {status == "" && <MyButton text="CONFIRMAR" theme="default" onClick={AskForRide} />}

        {status == "P" && <MyButton text="CANCELAR" theme="red" onClick={CancelRide}/>}

        {status == "A" && <MyButton text="FINALIZAR CARONA" theme="red" onClick={FinishRide} />}

    </View>
}

export default Passenger;
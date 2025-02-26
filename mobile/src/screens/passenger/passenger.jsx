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
    const [pickupAddress, setPickupAddress] = useState("");
    const [dropoffAddress, setDropoffAddress] = useState("");

    async function RequestRideFromUser() {
        // Acessa dados na API... 

        const response = {};      
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
            setMyLocation({
                latitude: Number(response.pickup_latitude),
                longitude: Number(response.pickup_longitude)
            });           
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
                            onChangeText={(text) => setPickupAddress(text)} />
                </View>

                <View style={styles.footerFields}>
                    <Text>Destino</Text>
                    <TextInput style={styles.input} value={dropoffAddress}
                            onChangeText={(text) => setDropoffAddress(text)} />
                </View>

                {/* <View style={styles.footerFields}>
                    <Text>Motorista</Text>
                    <TextInput style={styles.input} />
                </View> */}
            </View>       
        </> 
        
        :   <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>        
        }
        <MyButton text="CONFIRMAR" theme="default" onClick={AskForRide} />
    </View>
}

export default Passenger;
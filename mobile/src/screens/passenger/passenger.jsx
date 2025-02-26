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
   
    const [title, setTitle] = useState("");
    const [myLocation, setMyLocation] = useState("");

    async function RequestRideFromUser() {
        // Acessa dados na API... 

        const response = {};      
        return response;
    }

    async function LoadScreen() {
        // buscar dados de corrida aberta na API para o usuario...
        const response = await RequestRideFromUser();

        if (!response.ride_id) {

            // const location = { latitude: -23.561747, longitude: -46.656244 };
            const location = await RequestPermissionAndGetLocation();

            if (location.latitude) {
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
                    <TextInput style={styles.input} />
                </View>

                <View style={styles.footerFields}>
                    <Text>Destino</Text>
                    <TextInput style={styles.input} />
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
        <MyButton text="CONFIRMAR" theme="default" />
    </View>
}

export default Passenger;
import { useState, useEffect } from "react";
import { Text, TextInput, View, ActivityIndicator } from "react-native";
import { styles } from "./passenger.style.js";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import icons from "../../constants/icons.js";

function Passenger(props) {
    
    const [myLocation, setMyLocation] = useState("");

    async function RequestRideFromUser() {
        // Acessa dados na API... 

        const response = {};
        return response;
    }


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
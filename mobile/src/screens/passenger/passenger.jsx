import { useState } from "react";
import { Text,View } from "react-native";
import { styles } from "./passenger.style.js";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import icons from "../../constants/icons.js";

function Passenger(props) {

    const [myLocation, setMyLocation] = useState({
        latitude: 20,
        longitude: 20
    });

    return <View style={styles.container}>
          <MapView style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={{
                latitude: -23.561747,
                longitude: -46.656244,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004
            }}
        >
             <Marker coordinate={{
                latitude: -23.561747,
                longitude: -46.656244
            }}
                title="Evandro Oliveira"
                description="Av. Paulista, 1568"
                image={icons.location}
                style={styles.marker}
            />

        </MapView>
        <MyButton />
    </View>
}

export default Passenger;
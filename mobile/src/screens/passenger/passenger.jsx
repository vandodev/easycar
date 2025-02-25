import { Text,View } from "react-native";
import { styles } from "./passenger.style.js";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

function Passenger(props) {

    return <View style={styles.container}>
          <MapView style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={{
                latitude: -23.561747,
                longitude: -46.656244,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004
            }}
        ></MapView>
        <MyButton />
    </View>
}

export default Passenger;
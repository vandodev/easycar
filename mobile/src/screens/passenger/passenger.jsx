import { Text,View } from "react-native";
import { styles } from "./passenger.style.js";
import MyButton from "../../components/mybutton/mybutton.jsx";

function Passenger(props) {

    return <View style={styles.container}>
       <Text>Passageiro</Text>
       <MyButton text="Avançar" />
    </View>
}

export default Passenger;
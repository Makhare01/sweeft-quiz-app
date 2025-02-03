import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

const MainView = () => {
  return (
    <View>
      <Text>Main View</Text>
      <Link href="/quiz">QUIZ</Link>
    </View>
  );
};

export default MainView;

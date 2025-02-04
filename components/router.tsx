import { QUESTION_POINT } from "@/constants/common";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack, useNavigation } from "expo-router";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

const closeImage = require("../assets/images/close.png");
const pointImage = require("../assets/images/point.png");

export const Router = () => {
  const { background, text, secondaryText } = useThemeColor();

  const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: text,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 800,
        },
        contentStyle: {
          backgroundColor: background,
          padding: 20,
          paddingBottom: 58,
        },
        headerStyle: {
          backgroundColor: background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Quiz App",
          headerLeft: () => <></>,
        }}
      />
      <Stack.Screen
        name="quiz"
        options={{
          title: "Quiz",
          headerLeft: () => (
            <View style={styles.quizPointContainer}>
              <Image source={pointImage} style={styles.quizPointImage} />
              <Text style={[styles.quizPointText, { color: secondaryText }]}>
                {QUESTION_POINT}
              </Text>
            </View>
          ),
          gestureEnabled: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Quiz", "Are you sure you want to exit?", [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Exit",
                    onPress: () => {
                      navigation.goBack();
                    },
                  },
                ]);
              }}
              style={styles.closeButton}
            >
              <Image source={closeImage} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="result"
        options={{
          title: "Quiz Result",
          headerLeft: () => <></>,
          headerRight: () => (
            <TouchableOpacity
              onPress={navigation.goBack}
              style={styles.closeButton}
            >
              <Image source={closeImage} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    width: 36,
    height: 36,
    backgroundColor: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quizPointContainer: {
    height: 22,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  quizPointImage: {
    width: 14,
    height: 14,
  },
  quizPointText: {
    fontSize: 14,
    fontWeight: 700,
    marginTop: -2,
  },
});

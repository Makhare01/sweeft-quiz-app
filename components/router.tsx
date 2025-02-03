import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack, useNavigation } from "expo-router";
import { Alert, Image, StyleSheet, TouchableOpacity } from "react-native";

const closeImage = require("../assets/images/close.png");

export const Router = () => {
  const { background } = useThemeColor();

  const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: background,
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
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 800,
          },
        }}
      />
      <Stack.Screen
        name="quiz"
        options={{
          title: "Quiz",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 800,
          },
          headerLeft: () => <></>,
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
});

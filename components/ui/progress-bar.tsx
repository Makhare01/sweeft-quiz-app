import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Rect } from "react-native-svg";

type Props = {
  progress: number;
  total: number;
};

export const ProgressBar = ({ progress, total }: Props) => {
  const { disabledText, success } = useThemeColor();

  const percentage = (progress / total) * 100;

  return (
    <View style={styles.container}>
      <Svg width="100%" height="12">
        <Rect
          x="0"
          y="0"
          width="100%"
          height="12"
          rx="6"
          ry="6"
          fill="#F4F1EC"
        />
        <Rect
          x="0"
          y="0"
          width={`${percentage}%`}
          height="12"
          rx="6"
          ry="6"
          fill={success}
        />
      </Svg>
      <Text style={[styles.text, { color: disabledText }]}>
        {progress}/{total}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignSelf: "center",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: 700,
  },
});

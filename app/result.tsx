import { CustomButton } from "@/components/ui/custom-button";
import { QUESTION_POINT } from "@/constants/common";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

const resultImage = require("../assets/images/result.png");
const moneyImage = require("../assets/images/money.png");
const checkImage = require("../assets/images/check.png");

const ResultItem = ({
  imageSrc,
  text,
  point,
}: {
  imageSrc?: ImageSourcePropType;
  text: string;
  point: number;
}) => {
  const { text: textColor } = useThemeColor();

  return (
    <View style={styles.resultItem}>
      <View style={styles.resultLeft}>
        <View style={styles.resultPoint}>
          <Image source={imageSrc} />
        </View>
        <Text style={[styles.resultText, { color: textColor }]}>{text}</Text>
      </View>
      <Text style={[styles.resultText, { fontWeight: 900 }]}>{point}</Text>
    </View>
  );
};

const ResultView = () => {
  const router = useRouter();

  const { secondaryText, white, background } = useThemeColor();

  const { corrects, total } = useLocalSearchParams() as {
    corrects: string;
    total: string;
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={resultImage} />
        <Text style={[styles.header, { color: secondaryText }]}>
          Your Result
        </Text>

        <View
          style={[styles.resultBlocksContainer, { backgroundColor: white }]}
        >
          <ResultItem
            imageSrc={moneyImage}
            text="Score Gained"
            point={Number(corrects) * QUESTION_POINT}
          />
          <View style={[styles.divider, { borderColor: background }]} />
          <ResultItem
            imageSrc={checkImage}
            text="Correct predictions"
            point={Number(corrects)}
          />
        </View>
      </View>

      <CustomButton title="Start Again" onPress={() => router.push("/")} />
    </View>
  );
};

export default ResultView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 700,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 54,
  },
  resultBlocksContainer: {
    width: "100%",
    borderRadius: 8,
  },
  divider: {
    width: "100%",
    borderBottomWidth: 1,
  },
  resultItem: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  resultLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  resultPoint: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  resultText: {
    fontSize: 16,
    fontWeight: 600,
    textTransform: "uppercase",
  },
});

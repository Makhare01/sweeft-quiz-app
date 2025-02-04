import { CustomButton } from "@/components/ui/custom-button";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import DropdownComponent, { OptionValue } from "@/components/ui/dropdown";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api";
import { Difficulty } from "@/api/quiz.schema";

const DIFFICULTIES: Array<Difficulty> = ["easy", "medium", "hard"];

const MainView = () => {
  const router = useRouter();
  const { secondaryText } = useThemeColor();

  const [category, setCategory] = useState<OptionValue>();
  const [difficulty, setDifficulty] = useState<OptionValue>();

  const $categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.header, { color: secondaryText }]}>
          Welcome to the quiz app
        </Text>

        <View style={styles.inputsContainer}>
          <View>
            <Text style={styles.label}>Category</Text>
            <DropdownComponent
              options={[
                {
                  label: "All Category",
                  value: undefined,
                },
                ...($categories.data?.trivia_categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                })) ?? []),
              ]}
              value={category}
              onChange={(value) => setCategory(value)}
              placeholder="Select category"
            />
          </View>

          <View>
            <Text style={styles.label}>Difficulty</Text>
            <DropdownComponent
              options={[
                {
                  label: "All difficulty",
                  value: undefined,
                },
                ...DIFFICULTIES.map((item) => ({
                  label: item.charAt(0).toUpperCase() + item.slice(1),
                  value: item,
                })),
              ]}
              value={difficulty}
              onChange={(value) => setDifficulty(value)}
              placeholder="Select difficulty"
            />
          </View>
        </View>
      </View>

      <CustomButton
        title="Start"
        onPress={() => {
          router.push(
            `/quiz?category=${category ?? ""}&difficulty=${difficulty ?? ""}`
          );
          setCategory(undefined);
          setDifficulty(undefined);
        }}
      />
    </View>
  );
};

export default MainView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  inputsContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 20,
  },
  header: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 4,
    marginLeft: 8,
  },
});

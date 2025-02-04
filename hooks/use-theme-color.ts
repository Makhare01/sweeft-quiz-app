import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/use-color-scheme";

type ThemeColor = typeof Colors.light & typeof Colors.dark;

export const useThemeColor = (): ThemeColor => {
  // const theme = useColorScheme() ?? "light";

  // We explicitly set the theme to light, we can add colors for dark mode later
  return Colors["light"];
};

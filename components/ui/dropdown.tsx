import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

export type OptionValue = number | string | undefined;

type Option = {
  label: string;
  value: OptionValue;
};

type Props = {
  value: OptionValue;
  onChange: (value: OptionValue) => void;
  options: Array<Option>;
  placeholder?: string;
};

const DropdownComponent = ({
  options,
  value,
  onChange,
  placeholder,
}: Props) => {
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      placeholder={placeholder}
      selectedTextStyle={styles.selectedTextStyle}
      containerStyle={{ borderRadius: 8 }}
      itemContainerStyle={{ borderRadius: 8 }}
      data={options}
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={value}
      onChange={(item) => {
        onChange(item.value);
      }}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 60,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

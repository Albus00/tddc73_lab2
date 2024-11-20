import { Text, View, TextInput } from "react-native";
import styles from "@/app/styles";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

interface props {
  valueArray: Array<string>;
  placeholder: string;
  values: string | null | number;
  setValues: React.Dispatch<React.SetStateAction<string>>;
}

export default function Dropdown({
  valueArray,
  placeholder,
  values,
  setValues,
}: props) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    valueArray.map((value) => ({
      label: value,
      value: value,
    }))
  );

  return (
    <DropDownPicker
      open={open}
      value={values}
      items={items}
      setOpen={setOpen}
      setValue={setValues}
      setItems={setItems}
      style={[styles.input]}
      placeholder={placeholder}
      placeholderStyle={{
        color: "grey",
        fontFamily: "Poppins-Regular",
      }}
      textStyle={{
        fontFamily: "Poppins-Regular",
      }}
      dropDownContainerStyle={{
        borderColor: "grey",
      }}
    />
  );
}
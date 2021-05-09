import React, { useState, useEffect } from "react";
import TextInput from "../../../components/Forms/TextInput";

export default function TextInputCtrl({ label, setter, eValue }) {
  const [value, setValue] = useState(" ");

  useEffect(() => {
    setter(value);
  }, [value]);

  useEffect(() => {
    setValue(eValue);
  }, [eValue]);

  return <TextInput label={label} setValue={setValue} value={value} />;
}

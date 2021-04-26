import React, { useState, useEffect } from "react";
import TextInput from "../../../components/Forms/TextInput";

export default function TextInputCtrl({ label, setter }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setter(value);
  }, [value]);

  return <TextInput label={label} setValue={setValue} value={value} />;
}

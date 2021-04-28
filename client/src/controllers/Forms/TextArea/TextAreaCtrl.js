import React, { useState, useEffect } from "react";
import TextArea from "../../../components/Forms/TextArea";

export default function TextAreaCtrl({ label, setter, eValue }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setter(value);
  }, [value]);

  useEffect(() => {
    setValue(eValue);
  }, [eValue]);

  return <TextArea label={label} setValue={setValue} value={value} />;
}

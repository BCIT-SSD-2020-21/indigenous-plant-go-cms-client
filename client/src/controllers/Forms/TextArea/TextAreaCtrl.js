import React, { useState, useEffect } from "react";
import TextArea from "../../../components/Forms/TextArea";

export default function TextAreaCtrl({ label, setter }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setter(value);
  }, [value]);

  return <TextArea label={label} setValue={setValue} value={value} />;
}

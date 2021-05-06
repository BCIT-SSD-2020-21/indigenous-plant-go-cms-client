import React, { useEffect, useState } from "react";
import Toggler from "../../../components/Forms/Toggler";

export default function TogglerCtrl({ label, setter, eValue }) {
  const [value, setValue] = useState(true);

  useEffect(() => {
    setter(value);
  }, [value]);

  useEffect(() => {
    if (eValue !== null) {
      setValue(eValue);
    }
  }, []);

  return <Toggler label={label} setValue={setValue} value={value} />;
}

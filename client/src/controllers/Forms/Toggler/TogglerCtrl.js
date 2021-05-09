import React, { useEffect, useState } from "react";
import Toggler from "../../../components/Forms/Toggler";

export default function TogglerCtrl({ label, setter, eValue }) {
  const [value, setValue] = useState(true);

  useEffect(() => {
    setValue(eValue);
  }, [eValue]);

  useEffect(() => {
    setter(value);
  }, [value]);

  return <Toggler label={label} setValue={setValue} value={value} />;
}

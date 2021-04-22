import React from "react";
import {
  Input,
  Icon,
  Checkbox,
  Button,
  Message,
  Loader,
} from "semantic-ui-react";

export default function LoginForm({}) {
  return (
    <div>
      <form style={style.form}>
        <fieldset style={style.fieldset}>
          <p style={style.label}>
            Username or Email<span style={style.req}>*</span>
          </p>
          <Input
            style={style.input}
            icon="user"
            iconPosition="left"
            placeholder="Username or email"
          />
        </fieldset>

        <fieldset style={style.fieldset}>
          <p style={style.label}>
            Password <span style={style.req}>*</span>
          </p>
          <Input
            style={style.input}
            type="password"
            icon="key"
            iconPosition="left"
            placeholder="Password"
          />
        </fieldset>

        <fieldset style={style.fieldset}>
          <Checkbox
            checked={true}
            toggle
            label={{ children: "Remember me" }}
            style={style.input}
          />
        </fieldset>

        <fieldset style={style.fieldset}>
          <Button primary style={{ ...style.submit, position: "relative" }}>
            Login
          </Button>
        </fieldset>
      </form>
      <div style={style.formFooter}>
        <button style={{ color: "grey" }}>← Lost your password?</button>
      </div>
    </div>
  );
}

const style = {
  form: {
    background: "var(--lightprimary)",
    border: "1px solid lightgrey",
    minWidth: "350px",
    margin: "auto",
    padding: 20,
    boxShadow: "var(--shadow)",
  },
  formFooter: {
    padding: "20px 0",
  },
  input: {
    width: "100%",
    color: "var(--darksecondary)",
  },
  label: {
    color: "var(--darksecondary)",
    margin: 0,
    fontSize: 11,
    marginBottom: "3px",
  },
  fieldset: {
    marginBottom: "3px",
  },
  submit: {
    width: "100%",
    background: "var(--highlight)",
    borderRadius: "unset",
  },
  req: {
    color: "red",
    fontSize: 14,
  },
};

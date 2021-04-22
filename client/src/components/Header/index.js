import React from "react";

export default function Header({ handleSignout, userData }) {
  return (
    <header style={style.header}>
      <div className="wrap">
        <section style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                height: 30,
                width: 30,
                border: "1px solid var(--lightborder)",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                style={style.image}
                src="/assets/images/IIP-icon.png"
                alt="Indigenous Initiatives and Partnerships Logo"
              />
            </div>
            <h2 style={style.title}>Indigenous Plants Go</h2>
          </div>

          <ul style={style.profileMenu}>
            <li style={{ cursor: "pointer" }}>
              <button style={{ display: "flex" }}>
                <span
                  style={{
                    lineHeight: "30px",
                    marginRight: 15,
                    color: "var(--lightsecondary)",
                    cursor: "pointer",
                  }}
                >
                  {userData?.user?.username}
                </span>
                <span style={style.initial}>
                  {userData?.user?.username[0].toUpperCase()}
                </span>
              </button>
            </li>
            <li style={{ cursor: "pointer" }}>
              <button
                onClick={() => handleSignout()}
                style={{
                  color: "var(--lightsecondary)",
                  marginLeft: 10,
                  lineHeight: "30px",
                  cursor: "pointer",
                }}
              >
                Signout
              </button>
            </li>
          </ul>
        </section>
      </div>
    </header>
  );
}

const style = {
  header: {
    padding: "7px 20px",
    background: "var(--darkprimary)",
    border: "1px solid var(--darkborder)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 5000,
  },
  title: {
    color: "var(--lightprimary)",
    fontSize: 14,
    margin: 0,
    lineHeight: "30px",
    marginLeft: 10,
    textTransform: "uppercase",
    letterSpacing: "0.025em",
  },
  image: {
    width: "100%",
  },
  profileMenu: {
    display: "flex",
  },
  initial: {
    height: "30px",
    width: "30px",
    backgroundColor: "var(--highlight)",
    border: "1px solid var(--highlightsecondary)",
    color: "var(--lightprimary)",
    borderRadius: "50%",
    lineHeight: "27px",
    textAlign: "center",
    fontFamily: "serif, Times",
    display: "block",
    cursor: "pointer",
    fontSize: 17,
  },
};

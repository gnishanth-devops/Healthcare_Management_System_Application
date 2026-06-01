import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        backgroundColor: "#1e293b",
        color: "white",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
          fontSize: "22px"
        }}
      >
        HMS
      </h2>

      <ul
        style={{
          listStyle: "none",
          padding: 0
        }}
      >
        <li style={{ padding: "12px 0" }}>
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            📊 Dashboard
          </Link>
        </li>

        <li style={{ padding: "12px 0" }}>
          <Link
            to="/patients"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            👥 Patients
          </Link>
        </li>

        <li style={{ padding: "12px 0" }}>
          <Link
            to="/appointments"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            📅 Appointments
          </Link>
        </li>

        <li style={{ padding: "12px 0" }}>
          <Link
            to="/reports"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            📈 Reports
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

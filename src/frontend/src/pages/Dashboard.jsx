import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({
    patientCount: 0,
    appointmentCount: 0,
    recentPatients: [],
    recentAppointments: []
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/dashboard"
      );

      setData(response.data);
    } catch (error) {
      console.error("Dashboard API Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          marginBottom: "20px",
          fontSize: "32px"
        }}
      >
        Dashboard
      </h1>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "30px"
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <h3>Total Patients</h3>
          <h1
            style={{
              color: "#2563eb",
              fontSize: "42px",
              margin: 0
            }}
          >
            {data.patientCount}
          </h1>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <h3>Total Appointments</h3>
          <h1
            style={{
              color: "#16a34a",
              fontSize: "42px",
              margin: 0
            }}
          >
            {data.appointmentCount}
          </h1>
        </div>
      </div>

      {/* Tables */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px"
        }}
      >
        {/* Patients */}
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            overflowX: "auto"
          }}
        >
          <h2>Patients</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Age</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Condition</th>
              </tr>
            </thead>

            <tbody>
              {data.recentPatients.map((patient) => (
                <tr key={patient.id}>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {patient.id}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {patient.name}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {patient.age}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {patient.condition}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Appointments */}
        <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          overflowX: "auto"
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>
          Recent Appointments
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f1f5f9"
              }}
            >
              <th style={{ padding: "12px" }}>ID</th>
              <th style={{ padding: "12px" }}>Patient</th>
              <th style={{ padding: "12px" }}>Doctor</th>
              <th style={{ padding: "12px" }}>Date</th>
              <th style={{ padding: "12px" }}>Time</th>
            </tr>
          </thead>

          <tbody>
            {data.recentAppointments.map((appointment) => (
              <tr
                key={appointment.id}
                style={{
                  borderBottom: "1px solid #e5e7eb"
                }}
              >
                <td style={{ padding: "12px" }}>
                  {appointment.id}
                </td>

                <td style={{ padding: "12px" }}>
                  {appointment.patient_name}
                </td>

                <td style={{ padding: "12px" }}>
                  {appointment.doctor}
                </td>

                <td style={{ padding: "12px" }}>
                  {new Date(
                    appointment.appointment_date
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                </td>

                <td style={{ padding: "12px" }}>
                  {appointment.appointment_time.slice(0, 5)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default Dashboard;

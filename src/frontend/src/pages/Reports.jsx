import { useEffect, useState } from "react";
import axios from "axios";

function Reports() {
  const [patientReport, setPatientReport] = useState(null);
  const [appointmentReport, setAppointmentReport] = useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const patientRes = await axios.get(
        "http://localhost:3001/reports/patient-summary"
      );

      const appointmentRes = await axios.get(
        "http://localhost:3001/reports/appointment-summary"
      );

      setPatientReport(patientRes.data);
      setAppointmentReport(appointmentRes.data);

    } catch (error) {
      console.error(error);
    }
  };

  if (!patientReport || !appointmentReport) {
    return <h2>Loading Reports...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reports</h1>

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
            background: "#fff",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <h3>Total Patients</h3>
          <h1>{patientReport.totalPatients}</h1>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <h3>Total Appointments</h3>
          <h1>{appointmentReport.totalAppointments}</h1>
        </div>
      </div>

      <h2>Patients By Condition</h2>

      <h2 style={{ marginTop: "20px" }}>

      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th
              style={{
                padding: "12px",
                textAlign: "left"
              }}
            >
              Condition
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "center"
              }}
            >
              Count
            </th>
          </tr>
        </thead>

        <tbody>
          {patientReport.conditions.map((item) => (
            <tr key={item.condition}>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #e5e7eb"
                }}
              >
                {item.condition}
              </td>

              <td
                style={{
                  padding: "12px",
                  textAlign: "center",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: "bold"
                }}
              >
                {item.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <h2>Appointment Summary</h2>

      <p>
        Today's Appointments:
        {" "}
        <strong>
          {appointmentReport.todayAppointments}
        </strong>
      </p>
    </div>
  );
}

export default Reports;

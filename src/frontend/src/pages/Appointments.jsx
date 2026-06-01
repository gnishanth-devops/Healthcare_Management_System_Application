import { useEffect, useState } from "react";
import axios from "axios";

export default function Appointments() {
  const [patients, setPatients] = useState([]);

  const [form, setForm] = useState({
    patientId: "",
    date: "",
    time: "",
    doctor: "",
  });

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/patients"
      );

      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createAppointment = async () => {
    try {
      await axios.post(
        "http://localhost:3001/appointments",
        form
      );

      alert("Appointment Created");

      setForm({
        patientId: "",
        date: "",
        time: "",
        doctor: "",
      });

    } catch (error) {
      alert(
        error.response?.data?.error ||
        "Failed to create appointment"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Appointments
      </h1>

      <div className="bg-white p-6 rounded shadow w-96">

        <select
          className="border p-2 w-full mb-3"
          value={form.patientId}
          onChange={(e) =>
            setForm({
              ...form,
              patientId: e.target.value,
            })
          }
        >
          <option value="">
            Select Patient
          </option>

          {patients.map((patient) => (
            <option
              key={patient.id}
              value={patient.id}
            >
              {patient.id} - {patient.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 w-full mb-3"
          value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value,
            })
          }
        />

        <input
          type="time"
          className="border p-2 w-full mb-3"
          value={form.time}
          onChange={(e) =>
            setForm({
              ...form,
              time: e.target.value,
            })
          }
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Doctor Name"
          value={form.doctor}
          onChange={(e) =>
            setForm({
              ...form,
              doctor: e.target.value,
            })
          }
        />

        <button
          onClick={createAppointment}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Create Appointment
        </button>
      </div>
    </div>
  );
}

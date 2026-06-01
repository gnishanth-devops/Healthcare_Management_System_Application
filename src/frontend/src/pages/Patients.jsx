import { useState } from "react";
import axios from "axios";

export default function Patients() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    condition: "",
  });

  const createPatient = async () => {
    await axios.post(
      "http://localhost:3000/patients",
      form
    );

    alert("Patient Created");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Patients
      </h1>

      <div className="bg-white p-6 rounded shadow w-96">
        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Age"
          onChange={(e) =>
            setForm({ ...form, age: e.target.value })
          }
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Condition"
          onChange={(e) =>
            setForm({
              ...form,
              condition: e.target.value,
            })
          }
        />

        <button
          onClick={createPatient}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Patient
        </button>
      </div>
    </div>
  );
}

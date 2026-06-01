const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const pool = require('./db');
const cors = require('cors');

  app.use(cors());
  app.use(express.json());
  app.use(express.json());

  app.use(express.json());
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK', service: 'Appointment Service' });
    });

  app.get('/appointments', async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT * FROM appointments ORDER BY id'
      );

      res.json({
        message: 'Appointments retrieved successfully',
        count: result.rows.length,
        appointments: result.rows
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Database error'
      });
    }
  });

  app.get('/appointments/:id', async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT * FROM appointments WHERE id = $1',
        [req.params.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Appointment not found'
        });
      }

      res.json({
        message: 'Appointment found',
        appointment: result.rows[0]
      });
    } catch (error) {
      res.status(500).json({
        error: 'Database error'
      });
    }
  });

  app.post('/appointments', async (req, res) => {
    try {
      const { patientId, date, time, doctor } = req.body;

      if (!patientId || !date || !time || !doctor) {
        return res.status(400).json({
          error: 'Patient ID, date, time and doctor are required'
        });
      }

      // Validate patient exists
      const patientExists = await pool.query(
        "SELECT id FROM patients WHERE id = $1",
        [patientId]
      );

      if (patientExists.rows.length === 0) {
        return res.status(400).json({
          error: "Patient does not exist"
        });
      }

      // Create appointment
      const result = await pool.query(
        `INSERT INTO appointments
        (patient_id, appointment_date, appointment_time, doctor)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [patientId, date, time, doctor]
      );

      res.status(201).json({
        message: 'Appointment scheduled successfully',
        appointment: result.rows[0]
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: 'Database error'
      });
    }
  });

  app.get('/appointments/patient/:patientId', async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT * FROM appointments WHERE patient_id = $1',
        [req.params.patientId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: 'No appointments found'
        });
      }

      res.json({
        count: result.rows.length,
        appointments: result.rows
      });

    } catch (error) {
      res.status(500).json({
        error: 'Database error'
      });
    }
  });

app.get("/patients", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name FROM patients ORDER BY name"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Database error"
    });
  }
});

app.get("/dashboard", async (req, res) => {
  try {
    const patientCount = await pool.query(
      "SELECT COUNT(*) FROM patients"
    );

    const appointmentCount = await pool.query(
      "SELECT COUNT(*) FROM appointments"
    );

    const recentPatients = await pool.query(`
      SELECT
        id,
        name,
        age,
        condition
      FROM patients
      ORDER BY id DESC
      LIMIT 10
    `);

    const recentAppointments = await pool.query(`
      SELECT
        a.id,
        p.name AS patient_name,
        a.appointment_date,
        a.appointment_time,
        a.doctor
      FROM appointments a
      JOIN patients p
        ON a.patient_id = p.id
      ORDER BY a.id DESC
      LIMIT 10
    `);

    res.json({
      patientCount: Number(patientCount.rows[0].count),
      appointmentCount: Number(appointmentCount.rows[0].count),
      recentPatients: recentPatients.rows,
      recentAppointments: recentAppointments.rows
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Database error"
    });
  }
});
  app.get("/reports/appointment-summary", async (req, res) => {
    try {
      const totalAppointments = await pool.query(
        "SELECT COUNT(*) FROM appointments"
      );

      const todayAppointments = await pool.query(`
        SELECT COUNT(*)
        FROM appointments
        WHERE appointment_date = CURRENT_DATE
      `);

      res.json({
        totalAppointments: Number(totalAppointments.rows[0].count),
        todayAppointments: Number(todayAppointments.rows[0].count)
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Database error"
      });
    }
  });

  app.get("/reports/patient-summary", async (req, res) => {
    try {
      const totalPatients = await pool.query(
        "SELECT COUNT(*) FROM patients"
      );

      const conditionSummary = await pool.query(`
        SELECT
          condition,
          COUNT(*) as count
        FROM patients
        GROUP BY condition
        ORDER BY count DESC
      `);

      res.json({
        totalPatients: Number(totalPatients.rows[0].count),
        conditions: conditionSummary.rows
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Database error"
      });
    }
  });
  app.listen(port, '0.0.0.0', () => {
    console.log(`Appointment service listening at http://0.0.0.0:${port}`);
  });

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pool = require('./db');
const cors = require('cors');

    app.use(cors());
    app.use(express.json());

    app.use(express.json());

    app.get('/patients', async (req, res) => {
      try {
        const result = await pool.query(
          'SELECT * FROM patients ORDER BY id'
        );

        res.json({
          count: result.rows.length,
          patients: result.rows
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          error: 'Database error'
        });
      }
    });

    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK', service: 'Patient Service' });
    });

    app.get('/patients', (req, res) => {
      res.json({
        message: 'Patients retrieved successfully',
        count: patients.length,
        patients: patients
      });
    });

    app.get('/patients/:id', async (req, res) => {
      try {
        const result = await pool.query(
          'SELECT * FROM patients WHERE id = $1',
          [req.params.id]
        );

        if (result.rows.length === 0) {
          return res.status(404).json({
            error: 'Patient not found'
          });
        }

        res.json(result.rows[0]);
      } catch (err) {
        res.status(500).json({
          error: 'Database error'
        });
      }
    });

    app.post('/patients', async (req, res) => {
      try {
        const { name, age, condition } = req.body;

        const result = await pool.query(
          `INSERT INTO patients(name, age, condition)
          VALUES ($1, $2, $3)
          RETURNING *`,
          [name, age, condition]
        );

        res.status(201).json(result.rows[0]);
      } catch (err) {
        res.status(500).json({
          error: 'Database error'
        });
      }
    });

    app.listen(port, '0.0.0.0', () => {
      console.log(`Patient service listening at http://0.0.0.0:${port}`);
    });

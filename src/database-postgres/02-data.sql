INSERT INTO patients (name, age, gender, phone) VALUES
('John Smith', 35, 'Male', '9876543210'),
('Emma Wilson', 28, 'Female', '9876543211'),
('Michael Brown', 42, 'Male', '9876543212'),
('Sophia Davis', 31, 'Female', '9876543213'),
('William Johnson', 55, 'Male', '9876543214'),
('Olivia Martinez', 24, 'Female', '9876543215'),
('James Anderson', 38, 'Male', '9876543216'),
('Ava Taylor', 29, 'Female', '9876543217'),
('Benjamin Thomas', 47, 'Male', '9876543218'),
('Charlotte Moore', 33, 'Female', '9876543219');

INSERT INTO appointments
(patient_id, appointment_date, appointment_time, doctor, status)
VALUES
(1, CURRENT_DATE, '09:00', 'Dr. Rajesh Kumar', 'Scheduled'),
(2, CURRENT_DATE, '09:30', 'Dr. Priya Sharma', 'Scheduled'),
(3, CURRENT_DATE, '10:00', 'Dr. Amit Patel', 'Completed'),
(4, CURRENT_DATE, '10:30', 'Dr. Priya Sharma', 'Scheduled'),
(5, CURRENT_DATE, '11:00', 'Dr. Rajesh Kumar', 'Cancelled'),
(6, CURRENT_DATE, '11:30', 'Dr. Amit Patel', 'Scheduled'),
(7, CURRENT_DATE, '12:00', 'Dr. Priya Sharma', 'Completed'),
(8, CURRENT_DATE, '12:30', 'Dr. Rajesh Kumar', 'Scheduled'),
(9, CURRENT_DATE, '13:00', 'Dr. Amit Patel', 'Scheduled'),
(10, CURRENT_DATE, '13:30', 'Dr. Priya Sharma', 'Scheduled');

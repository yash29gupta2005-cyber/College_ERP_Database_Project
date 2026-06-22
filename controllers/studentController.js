const connection = require("../config/db");

const getAllStudents = (req, res) => {
    const query = `
        SELECT
            s.student_id,
            s.first_name,
            s.last_name,
            s.email,
            s.phone,
            s.admission_date,
            d.department_name
        FROM students s
        JOIN departments d
            ON s.department_id = d.department_id
        ORDER BY s.student_id
    `;

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
};

const createStudent = (req, res) => {
    const {
        first_name,
        last_name,
        email,
        phone,
        department_id,
        admission_date
    } = req.body;

    const query = `
        INSERT INTO students
        (
            first_name,
            last_name,
            email,
            phone,
            department_id,
            admission_date
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        query,
        [
            first_name,
            last_name,
            email,
            phone,
            department_id,
            admission_date
        ],
        (error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Student created successfully",
                student_id: result.insertId
            });
        }
    );
};

const updateStudent = (req, res) => {
    const { id } = req.params;

    const {
        first_name,
        last_name,
        email,
        phone,
        department_id,
        admission_date
    } = req.body;

    const query = `
        UPDATE students
        SET
            first_name = ?,
            last_name = ?,
            email = ?,
            phone = ?,
            department_id = ?,
            admission_date = ?
        WHERE student_id = ?
    `;

    connection.query(
        query,
        [
            first_name,
            last_name,
            email,
            phone,
            department_id,
            admission_date,
            id
        ],
        (error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Student not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Student updated successfully"
            });
        }
    );
};

const deleteStudent = (req, res) => {
    const { id } = req.params;

    const query = `
        DELETE FROM students
        WHERE student_id = ?
    `;

    connection.query(
        query,
        [id],
        (error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Student not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Student deleted successfully"
            });
        }
    );
};

module.exports = {
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent
};


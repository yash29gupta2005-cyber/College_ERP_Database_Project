const connection = require("../config/db");

const getAllEnrollments = (req, res) => {
    const query = `
        SELECT
            e.enrollment_id,
            CONCAT(s.first_name, ' ', s.last_name) AS student_name,
            c.course_code,
            c.course_name,
            e.enrollment_date,
            e.grade
        FROM enrollments e
        JOIN students s
            ON e.student_id = s.student_id
        JOIN courses c
            ON e.course_id = c.course_id
        ORDER BY e.enrollment_id
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

const createEnrollment = (req, res) => {
    const {
        student_id,
        course_id,
        enrollment_date,
        grade
    } = req.body;

    const query = `
        INSERT INTO enrollments
        (
            student_id,
            course_id,
            enrollment_date,
            grade
        )
        VALUES (?, ?, ?, ?)
    `;

    connection.query(
        query,
        [
            student_id,
            course_id,
            enrollment_date,
            grade
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
                message: "Enrollment created successfully",
                enrollment_id: result.insertId
            });
        }
    );
};

const updateEnrollment = (req, res) => {
    const { id } = req.params;

    const {
        student_id,
        course_id,
        enrollment_date,
        grade
    } = req.body;

    const query = `
        UPDATE enrollments
        SET
            student_id = ?,
            course_id = ?,
            enrollment_date = ?,
            grade = ?
        WHERE enrollment_id = ?
    `;

    connection.query(
        query,
        [
            student_id,
            course_id,
            enrollment_date,
            grade,
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
                    message: "Enrollment not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Enrollment updated successfully"
            });
        }
    );
};

const deleteEnrollment = (req, res) => {
    const { id } = req.params;

    const query = `
        DELETE FROM enrollments
        WHERE enrollment_id = ?
    `;

    connection.query(query, [id], (error, result) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Enrollment deleted successfully"
        });
    });
};

module.exports = {
    getAllEnrollments,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment
};


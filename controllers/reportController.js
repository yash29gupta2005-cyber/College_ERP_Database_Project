const connection = require("../config/db");

const getStudentsByDepartment = (req, res) => {
    const query = `
        SELECT
            d.department_name,
            COUNT(s.student_id) AS student_count
        FROM departments d
        LEFT JOIN students s
            ON d.department_id = s.department_id
        GROUP BY d.department_id, d.department_name
        ORDER BY student_count DESC
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

const getCoursesByDepartment = (req, res) => {
    const query = `
        SELECT
            d.department_name,
            COUNT(c.course_id) AS course_count
        FROM departments d
        LEFT JOIN courses c
            ON d.department_id = c.department_id
        GROUP BY d.department_id, d.department_name
        ORDER BY course_count DESC
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

const getEnrollmentsByCourse = (req, res) => {
    const query = `
        SELECT
            c.course_code,
            c.course_name,
            COUNT(e.enrollment_id) AS enrollment_count
        FROM courses c
        LEFT JOIN enrollments e
            ON c.course_id = e.course_id
        GROUP BY c.course_id, c.course_code, c.course_name
        ORDER BY enrollment_count DESC
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

module.exports = {
    getStudentsByDepartment,
    getCoursesByDepartment,
    getEnrollmentsByCourse
};


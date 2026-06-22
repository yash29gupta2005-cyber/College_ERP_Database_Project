const connection = require("../config/db");

const getAllCourses = (req, res) => {
    const query = `
        SELECT
            c.course_id,
            c.course_code,
            c.course_name,
            c.credits,
            d.department_name,
            CONCAT(f.first_name, ' ', f.last_name) AS faculty_name
        FROM courses c
        JOIN departments d
            ON c.department_id = d.department_id
        JOIN faculty f
            ON c.faculty_id = f.faculty_id
        ORDER BY c.course_id
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

const createCourse = (req, res) => {
    const {
        course_code,
        course_name,
        credits,
        department_id,
        faculty_id
    } = req.body;

    const query = `
        INSERT INTO courses
        (
            course_code,
            course_name,
            credits,
            department_id,
            faculty_id
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(
        query,
        [
            course_code,
            course_name,
            credits,
            department_id,
            faculty_id
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
                message: "Course created successfully",
                course_id: result.insertId
            });
        }
    );
};

const updateCourse = (req, res) => {
    const { id } = req.params;

    const {
        course_code,
        course_name,
        credits,
        department_id,
        faculty_id
    } = req.body;

    const query = `
        UPDATE courses
        SET
            course_code = ?,
            course_name = ?,
            credits = ?,
            department_id = ?,
            faculty_id = ?
        WHERE course_id = ?
    `;

    connection.query(
        query,
        [
            course_code,
            course_name,
            credits,
            department_id,
            faculty_id,
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
                    message: "Course not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Course updated successfully"
            });
        }
    );
};

const deleteCourse = (req, res) => {
    const { id } = req.params;

    const query = `
        DELETE FROM courses
        WHERE course_id = ?
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
                    message: "Course not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Course deleted successfully"
            });
        }
    );
};

module.exports = {
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse
};

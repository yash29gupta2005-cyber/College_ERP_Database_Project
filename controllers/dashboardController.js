const connection = require("../config/db");

const getDashboardStats = (req, res) => {
    const query = `
        SELECT
            (SELECT COUNT(*) FROM departments) AS totalDepartments,
            (SELECT COUNT(*) FROM students) AS totalStudents,
            (SELECT COUNT(*) FROM faculty) AS totalFaculty,
            (SELECT COUNT(*) FROM courses) AS totalCourses,
            (SELECT COUNT(*) FROM enrollments) AS totalEnrollments
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
            data: results[0]
        });
    });
};

module.exports = {
    getDashboardStats
};

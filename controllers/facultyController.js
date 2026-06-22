const connection = require("../config/db");

const getAllFaculty = (req, res) => {
    const query = `
        SELECT
            f.faculty_id,
            f.first_name,
            f.last_name,
            f.email,
            d.department_name
        FROM faculty f
        JOIN departments d
            ON f.department_id = d.department_id
        ORDER BY f.faculty_id
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

const createFaculty = (req, res) => {
    const {
        first_name,
        last_name,
        email,
        department_id
    } = req.body;

    const query = `
        INSERT INTO faculty
        (
            first_name,
            last_name,
            email,
            department_id
        )
        VALUES (?, ?, ?, ?)
    `;

    connection.query(
        query,
        [
            first_name,
            last_name,
            email,
            department_id
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
                message: "Faculty created successfully",
                faculty_id: result.insertId
            });
        }
    );
};

const updateFaculty = (req, res) => {
    const { id } = req.params;

    const {
        first_name,
        last_name,
        email,
        department_id
    } = req.body;

    const query = `
        UPDATE faculty
        SET
            first_name = ?,
            last_name = ?,
            email = ?,
            department_id = ?
        WHERE faculty_id = ?
    `;

    connection.query(
        query,
        [
            first_name,
            last_name,
            email,
            department_id,
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
                    message: "Faculty not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Faculty updated successfully"
            });
        }
    );
};

const deleteFaculty = (req, res) => {
    const { id } = req.params;

    const query = `
        DELETE FROM faculty
        WHERE faculty_id = ?
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
                    message: "Faculty not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Faculty deleted successfully"
            });
        }
    );
};

module.exports = {
    getAllFaculty,
    createFaculty,
    updateFaculty,
    deleteFaculty
};


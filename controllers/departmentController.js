const connection = require("../config/db");

const getAllDepartments = (req, res) => {
    const query = `
        SELECT
            department_id,
            department_name
        FROM departments
        ORDER BY department_id
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

const createDepartment = (req, res) => {
    const { department_name } = req.body;

    const query = `
        INSERT INTO departments (department_name)
        VALUES (?)
    `;

    connection.query(
        query,
        [department_name],
        (error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Department created successfully",
                department_id: result.insertId
            });
        }
    );
};

const updateDepartment = (req, res) => {
    const { id } = req.params;
    const { department_name } = req.body;

    const query = `
        UPDATE departments
        SET department_name = ?
        WHERE department_id = ?
    `;

    connection.query(
        query,
        [department_name, id],
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
                    message: "Department not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Department updated successfully"
            });
        }
    );
};

const deleteDepartment = (req, res) => {
    const { id } = req.params;

    const query = `
        DELETE FROM departments
        WHERE department_id = ?
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
                    message: "Department not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Department deleted successfully"
            });
        }
    );
};

module.exports = {
    getAllDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
};


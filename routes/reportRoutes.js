const express = require("express");
const router = express.Router();

const {
    getStudentsByDepartment,
    getCoursesByDepartment,
    getEnrollmentsByCourse
} = require("../controllers/reportController");

router.get("/students-by-department", getStudentsByDepartment);

router.get("/courses-by-department", getCoursesByDepartment);

router.get("/enrollments-by-course", getEnrollmentsByCourse);

module.exports = router;

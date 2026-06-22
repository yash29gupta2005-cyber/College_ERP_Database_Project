fetch("/dashboard")
    .then(response => response.json())
    .then(result => {

        document.getElementById("departments").innerText =
            result.data.totalDepartments;

        document.getElementById("students").innerText =
            result.data.totalStudents;

        document.getElementById("faculty").innerText =
            result.data.totalFaculty;

        document.getElementById("courses").innerText =
            result.data.totalCourses;

        document.getElementById("enrollments").innerText =
            result.data.totalEnrollments;
    });
    
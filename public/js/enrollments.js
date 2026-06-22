fetch("/enrollments")
    .then(res => res.json())
    .then(result => {

        let rows = "";

        result.data.forEach(enrollment => {

            rows += `
                <tr>
                    <td>${enrollment.enrollment_id}</td>
                    <td>${enrollment.student_name}</td>
                    <td>${enrollment.course_name}</td>
                    <td>${enrollment.grade}</td>
                </tr>
            `;
        });

        document.getElementById("enrollmentTable").innerHTML = rows;
    });
    
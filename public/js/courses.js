fetch("/courses")
    .then(res => res.json())
    .then(result => {

        let rows = "";

        result.data.forEach(course => {

            rows += `
                <tr>
                    <td>${course.course_id}</td>
                    <td>${course.course_code}</td>
                    <td>${course.course_name}</td>
                    <td>${course.credits}</td>
                    <td>${course.department_name}</td>
                </tr>
            `;
        });

        document.getElementById("courseTable").innerHTML = rows;
    });
    
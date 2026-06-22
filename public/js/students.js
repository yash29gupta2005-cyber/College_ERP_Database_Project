fetch("/students")
    .then(res => res.json())
    .then(result => {

        let rows = "";

        result.data.forEach(student => {

            rows += `
                <tr>
                    <td>${student.student_id}</td>
                    <td>${student.first_name} ${student.last_name}</td>
                    <td>${student.email}</td>
                    <td>${student.department_name}</td>
                </tr>
            `;
        });

        document.getElementById("studentTable").innerHTML = rows;
    });
    
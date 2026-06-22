fetch("/faculty")
    .then(res => res.json())
    .then(result => {

        let rows = "";

        result.data.forEach(faculty => {

            rows += `
                <tr>
                    <td>${faculty.faculty_id}</td>
                    <td>${faculty.first_name} ${faculty.last_name}</td>
                    <td>${faculty.email}</td>
                    <td>${faculty.department_name}</td>
                </tr>
            `;
        });

        document.getElementById("facultyTable").innerHTML = rows;
    });
    
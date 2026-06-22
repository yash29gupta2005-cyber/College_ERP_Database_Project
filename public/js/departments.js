fetch("/departments")
    .then(res => res.json())
    .then(result => {

        let rows = "";

        result.data.forEach(department => {

            rows += `
                <tr>
                    <td>${department.department_id}</td>
                    <td>${department.department_name}</td>
                </tr>
            `;
        });

        document.getElementById("departmentTable").innerHTML = rows;
    })
    .catch(error => {
        console.error(error);
    });
    
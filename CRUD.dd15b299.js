const BASE_URL="http://localhost:3000/students",getStudentsBtn=document.getElementById("get-students-btn"),studentsTableBody=document.querySelector("#students-table tbody"),addStudentForm=document.getElementById("add-student-form");async function getStudents(){try{let t=await fetch(BASE_URL);if(!t.ok)throw Error("Помилка отримання студентів");let e=await t.json();renderStudents(e)}catch(t){console.error(t),alert("Не вдалося отримати студентів")}}function renderStudents(t){studentsTableBody.innerHTML="",t.forEach(t=>{let e=document.createElement("tr");e.innerHTML=`
      <td>${t.id}</td>
      <td>${t.name}</td>
      <td>${t.age}</td>
      <td>${t.course}</td>
      <td>${t.skills.join(", ")}</td>
      <td>${t.email}</td>
      <td>${t.isEnrolled?"Так":"Ні"}</td>
      <td>
        <button onclick="updateStudent(${t.id})">
          \u{41E}\u{43D}\u{43E}\u{432}\u{438}\u{442}\u{438}
        </button>

        <button onclick="deleteStudent(${t.id})">
          \u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}
        </button>
      </td>
    `,studentsTableBody.appendChild(e)})}async function addStudent(t){t.preventDefault();let e={name:document.getElementById("name").value,age:Number(document.getElementById("age").value),course:document.getElementById("course").value,skills:document.getElementById("skills").value.split(",").map(t=>t.trim()),email:document.getElementById("email").value,isEnrolled:document.getElementById("isEnrolled").checked};try{if(!(await fetch(BASE_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok)throw Error("Помилка додавання студента");addStudentForm.reset(),getStudents()}catch(t){console.error(t),alert("Не вдалося додати студента")}}async function updateStudent(t){let e=prompt("Введіть новий курс");if(e)try{if(!(await fetch(`${BASE_URL}/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({course:e})})).ok)throw Error("Помилка оновлення студента");getStudents()}catch(t){console.error(t),alert("Не вдалося оновити студента")}}async function deleteStudent(t){if(confirm("Ви дійсно хочете видалити студента?"))try{if(!(await fetch(`${BASE_URL}/${t}`,{method:"DELETE"})).ok)throw Error("Помилка видалення студента");getStudents()}catch(t){console.error(t),alert("Не вдалося видалити студента")}}getStudentsBtn.addEventListener("click",getStudents),addStudentForm.addEventListener("submit",addStudent);
//# sourceMappingURL=CRUD.dd15b299.js.map

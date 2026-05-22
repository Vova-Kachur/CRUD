// URL API
const BASE_URL = 'http://localhost:3000/students';
// Отримання елементів
const getStudentsBtn = document.getElementById('get-students-btn');
const studentsTableBody = document.querySelector('#students-table tbody');
const addStudentForm = document.getElementById('add-student-form');
// Події
getStudentsBtn.addEventListener('click', getStudents);
addStudentForm.addEventListener('submit', addStudent);
// Функція для отримання всіх студентів
async function getStudents() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0456\u0432");
        const students = await response.json();
        renderStudents(students);
    } catch (error) {
        console.error(error);
        alert("\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0456\u0432");
    }
}
// Функція для відображення студентів у таблиці
function renderStudents(students) {
    studentsTableBody.innerHTML = '';
    students.forEach((student)=>{
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(', ')}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? "\u0422\u0430\u043A" : "\u041D\u0456"}</td>
      <td>
        <button onclick="updateStudent(${student.id})">
          \u{41E}\u{43D}\u{43E}\u{432}\u{438}\u{442}\u{438}
        </button>

        <button onclick="deleteStudent(${student.id})">
          \u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}
        </button>
      </td>
    `;
        studentsTableBody.appendChild(row);
    });
}
// Функція для додавання нового студента
async function addStudent(e) {
    e.preventDefault();
    const newStudent = {
        name: document.getElementById('name').value,
        age: Number(document.getElementById('age').value),
        course: document.getElementById('course').value,
        skills: document.getElementById('skills').value.split(',').map((skill)=>skill.trim()),
        email: document.getElementById('email').value,
        isEnrolled: document.getElementById('isEnrolled').checked
    };
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStudent)
        });
        if (!response.ok) throw new Error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0434\u043E\u0434\u0430\u0432\u0430\u043D\u043D\u044F \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430");
        addStudentForm.reset();
        getStudents();
    } catch (error) {
        console.error(error);
        alert("\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0434\u043E\u0434\u0430\u0442\u0438 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430");
    }
}
// Функція для оновлення студента
async function updateStudent(id) {
    const updatedCourse = prompt("\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u043E\u0432\u0438\u0439 \u043A\u0443\u0440\u0441");
    if (!updatedCourse) return;
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                course: updatedCourse
            })
        });
        if (!response.ok) throw new Error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430");
        getStudents();
    } catch (error) {
        console.error(error);
        alert("\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u043D\u043E\u0432\u0438\u0442\u0438 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430");
    }
}
// Функція для видалення студента
async function deleteStudent(id) {
    const confirmDelete = confirm("\u0412\u0438 \u0434\u0456\u0439\u0441\u043D\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430?");
    if (!confirmDelete) return;
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430");
        getStudents();
    } catch (error) {
        console.error(error);
        alert("\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430");
    }
}

//# sourceMappingURL=CRUD.579125c3.js.map

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

    if (!response.ok) {
      throw new Error('Помилка отримання студентів');
    }

    const students = await response.json();

    renderStudents(students);

  } catch (error) {
    console.error(error);
    alert('Не вдалося отримати студентів');
  }
}

// Функція для відображення студентів у таблиці
function renderStudents(students) {

  studentsTableBody.innerHTML = '';

  students.forEach(student => {

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(', ')}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? 'Так' : 'Ні'}</td>
      <td>
        <button onclick="updateStudent(${student.id})">
          Оновити
        </button>

        <button onclick="deleteStudent(${student.id})">
          Видалити
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
    skills: document.getElementById('skills').value
      .split(',')
      .map(skill => skill.trim()),
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

    if (!response.ok) {
      throw new Error('Помилка додавання студента');
    }

    addStudentForm.reset();

    getStudents();

  } catch (error) {

    console.error(error);
    alert('Не вдалося додати студента');

  }

}

// Функція для оновлення студента
async function updateStudent(id) {

  const updatedCourse = prompt('Введіть новий курс');

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

    if (!response.ok) {
      throw new Error('Помилка оновлення студента');
    }

    getStudents();

  } catch (error) {

    console.error(error);
    alert('Не вдалося оновити студента');

  }

}

// Функція для видалення студента
async function deleteStudent(id) {

  const confirmDelete = confirm('Ви дійсно хочете видалити студента?');

  if (!confirmDelete) return;

  try {

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Помилка видалення студента');
    }

    getStudents();

  } catch (error) {

    console.error(error);
    alert('Не вдалося видалити студента');

  }

}
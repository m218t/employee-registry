const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

const employees = [
    { id: 1, full_name: 'Иванов Иван Иванович', department: 'IT', position: 'Разработчик', salary: 150000, is_active: true },
    { id: 2, full_name: 'Петрова Анна Сергеевна', department: 'HR', position: 'Менеджер', salary: 120000, is_active: true }
];

app.get('/api/employees', (req, res) => {
    res.json(employees);
});

app.get('/api/employees/search', (req, res) => {
    const name = req.query.name || '';
    const filtered = employees.filter(e =>
        e.full_name.toLowerCase().includes(name.toLowerCase())
    );
    res.json(filtered);
});

app.post('/api/employees', (req, res) => {
    const newEmployee = {
        id: employees.length + 1,
        ...req.body,
        is_active: true
    };
    employees.push(newEmployee);
    res.json(newEmployee);
});

app.patch('/api/employees/:id/dismiss', (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find(e => e.id === id);
    if (employee) {
        employee.is_active = false;
        res.json(employee);
    } else {
        res.status(404).json({ error: 'Сотрудник не найден' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('✅ Сервер запущен: http://localhost:3000');
    console.log('📊 API доступен по /api/employees');
});
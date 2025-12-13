const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

let employees = [
    {
        id: 1,
        last_name: 'Иванов',
        first_name: 'Иван',
        middle_name: 'Иванович',
        passport_series: '4510',
        passport_number: '123456',
        phone: '+7 (999) 123-45-67',
        email: 'ivanov@mail.ru',
        address: 'Москва',
        department: 'IT',
        position: 'Разработчик',
        salary: 150000,
        birth_date: '1985-05-15',
        hire_date: '2020-01-15',
        is_fired: false,
        fired_date: null
    },
    {
        id: 2,
        last_name: 'Петрова',
        first_name: 'Анна',
        middle_name: 'Сергеевна',
        passport_series: '4520',
        passport_number: '654321',
        phone: '+7 (999) 765-43-21',
        email: 'petrova@mail.ru',
        address: 'Москва',
        department: 'HR',
        position: 'Менеджер',
        salary: 120000,
        birth_date: '1990-08-20',
        hire_date: '2021-03-10',
        is_fired: false,
        fired_date: null
    }
];

function addComputedFields(employee) {
    return {
        ...employee,
        full_name: `${employee.last_name} ${employee.first_name} ${employee.middle_name || ''}`.trim(),
        passport_full: `${employee.passport_series || ''} ${employee.passport_number || ''}`.trim()
    };
}

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;


    if (req.method === 'GET' && pathname === '/api/employees') {
        const employeesWithFields = employees.map(addComputedFields);
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(employeesWithFields));
        return;
    }


    if (req.method === 'GET' && pathname === '/api/employees/search') {
        const name = parsedUrl.query.name || '';

        const filtered = employees.filter(emp =>
            `${emp.last_name} ${emp.first_name} ${emp.middle_name || ''}`
                .toLowerCase()
                .includes(name.toLowerCase())
        );

        const filteredWithFields = filtered.map(addComputedFields);
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(filteredWithFields));
        return;
    }


    if (req.method === 'POST' && pathname === '/api/employees') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const newEmployee = JSON.parse(body);
                newEmployee.id = employees.length + 1;
                newEmployee.is_fired = false;
                newEmployee.fired_date = null;
                employees.push(newEmployee);

                const newEmployeeWithFields = addComputedFields(newEmployee);
                res.writeHead(201, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(newEmployeeWithFields));
            } catch (error) {
                res.writeHead(400, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        return;
    }


    if (req.method === 'PATCH' && pathname.match(/^\/api\/employees\/\d+\/dismiss$/)) {
        const id = parseInt(pathname.split('/')[3]);
        const employee = employees.find(emp => emp.id === id);

        if (employee) {
            employee.is_fired = true;
            employee.fired_date = new Date().toISOString().split('T')[0];

            const employeeWithFields = addComputedFields(employee);
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(employeeWithFields));
        } else {
            res.writeHead(404, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify({ error: 'Сотрудник не найден' }));
        }
        return;
    }


    let filePath = pathname === '/' ? '/index.html' : pathname;
    filePath = path.join(__dirname, 'public', filePath);

    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Если файл не найден — отдаём index.html (для SPA)
                fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8', (err2, content2) => {
                    if (err2) {
                        res.writeHead(404, {
                            'Content-Type': 'text/plain; charset=utf-8'
                        });
                        res.end('Not Found');
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'text/html; charset=utf-8'
                        });
                        res.end(content2);
                    }
                });
            } else {
                res.writeHead(500, {
                    'Content-Type': 'text/plain; charset=utf-8'
                });
                res.end('Server Error');
            }
        } else {
            const ext = path.extname(filePath).toLowerCase();
            const contentType = {
                '.html': 'text/html; charset=utf-8',
                '.css': 'text/css; charset=utf-8',
                '.js': 'text/javascript; charset=utf-8',
                '.json': 'application/json; charset=utf-8'
            }[ext] || 'text/plain; charset=utf-8';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(3000, () => {
    console.log('Сервер запущен: http://localhost:3000');
    console.log('API: http://localhost:3000/api/employees');
    console.log('Сотрудников в базе:', employees.length);
});
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const mockData = {
  employees: [
    { id: 1, name: 'Иванов И.И.', department: 'УОРиПМ', workload: 65 },
    { id: 2, name: 'Петров П.П.', department: 'УОРиПМ', workload: 95 },
    { id: 3, name: 'Сидоров С.С.', department: 'ЭО', workload: 45 },
    { id: 4, name: 'Кузнецова Е.В.', department: 'ЭО', workload: 75 },
    { id: 5, name: 'Смирнов А.А.', department: 'УОРиПМ', workload: 55 },
    { id: 6, name: 'Федорова М.К.', department: 'ЭО', workload: 60 },
  ],
  processes: [
    { id: 1, name: 'Оформление кредита', status: 'active', progress: 65, priority: 'high', deadline: '2023-12-15' },
    { id: 2, name: 'Проверка документов', status: 'paused', progress: 30, priority: 'medium', deadline: '2023-12-20' },
    { id: 3, name: 'Согласование условий', status: 'completed', progress: 100, priority: 'low', deadline: '2023-12-10' },
  ],
  tasks: [
    { id: 1, processId: 1, name: 'Проверить заявку', assignee: 1, status: 'in-progress', priority: 'high', deadline: '2023-12-12' },
    { id: 2, processId: 1, name: 'Запросить документы', assignee: 2, status: 'todo', priority: 'medium', deadline: '2023-12-13' },
    { id: 3, processId: 2, name: 'Верификация данных', assignee: 3, status: 'paused', priority: 'low', deadline: '2023-12-18' },
  ]
};

app.get('/api/dashboard', (req, res) => {
  res.json({
    workload: mockData.employees,
    activeProcesses: mockData.processes.filter(p => p.status === 'active'),
    pausedProcesses: mockData.processes.filter(p => p.status === 'paused'),
    completedProcesses: mockData.processes.filter(p => p.status === 'completed'),
  });
});
app.get('/processes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'processes.html'));
});
app.get('/api/processes', (req, res) => {
  res.json(mockData.processes);
});

app.get('/api/tasks', (req, res) => {
  res.json(mockData.tasks);
});

app.get('/api/employees', (req, res) => {
  res.json(mockData.employees);
});

app.post('/api/update-task', (req, res) => {
  const { taskId, status } = req.body;
  const task = mockData.tasks.find(t => t.id === taskId);
  if (task) {
    task.status = status;
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
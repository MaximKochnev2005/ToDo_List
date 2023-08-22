const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Получение списка задач с пагинацией и сортировкой
router.get('/', taskController.getTasks);

// Создание новой задачи
router.post('/', taskController.createTask);

// Обновление задачи (только администратор)
router.put('/:id', authMiddleware.authenticateAdmin, taskController.updateTask);

module.exports = router;
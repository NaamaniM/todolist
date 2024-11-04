document.addEventListener("DOMContentLoaded", function() {
    let tasks = [];
    const taskList = document.getElementById("taskList");
    const taskModal = document.getElementById("taskModal");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const closeModal = document.getElementById("closeModal");
    const taskForm = document.getElementById("taskForm");
    let editTaskId = null;

    // Função para renderizar a lista de tarefas
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.sort((a, b) => a.order - b.order).forEach((task, index) => {
            const row = document.createElement("tr");
            if (task.cost >= 1000) {
                row.classList.add("highlight");
            }
            row.innerHTML = `
                <td>${task.name}</td>
                <td>R$ ${task.cost}</td>
                <td>${task.deadline}</td>
                <td>
                    <button onclick="editTask(${task.id})">✏️</button>
                    <button onclick="deleteTask(${task.id})">🗑️</button>
                    <button class="move-up" onclick="moveTaskUp(${task.id})" ${index === 0 ? 'disabled' : ''}>⬆️</button>
                    <button class="move-down" onclick="moveTaskDown(${task.id})" ${index === tasks.length - 1 ? 'disabled' : ''}>⬇️</button>
                    
                </td>
            `;
            taskList.appendChild(row);
        });
    }

    // Função para mover a tarefa para cima
    window.moveTaskUp = function(id) {
        const index = tasks.findIndex(task => task.id === id);
        if (index > 0) {
            const tempOrder = tasks[index].order;
            tasks[index].order = tasks[index - 1].order;
            tasks[index - 1].order = tempOrder;
            renderTasks();
        }
    }

    // Função para mover a tarefa para baixo
    window.moveTaskDown = function(id) {
        const index = tasks.findIndex(task => task.id === id);
        if (index < tasks.length - 1) {
            const tempOrder = tasks[index].order;
            tasks[index].order = tasks[index + 1].order;
            tasks[index + 1].order = tempOrder;
            renderTasks();
        }
    }

    // Função para abrir o modal
    function openModal(isEdit = false) {
        taskModal.style.display = "flex";
        document.getElementById("modalTitle").innerText = isEdit ? "Editar Tarefa" : "Incluir Tarefa";
    }

    // Função para fechar o modal
    function closeModalFunc() {
        taskModal.style.display = "none";
        taskForm.reset();
        editTaskId = null;
    }

    // adicionar nova tarefa
    addTaskBtn.addEventListener("click", () => {
        openModal();
    });

    //  para fechar o modal
    closeModal.addEventListener("click", closeModalFunc);

    // Submissão do formulário para salvar tarefa
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("taskName").value;
        const cost = parseFloat(document.getElementById("taskCost").value);
        const deadline = document.getElementById("taskDeadline").value;

        if (editTaskId) {
            const task = tasks.find(t => t.id === editTaskId);
            task.name = name;
            task.cost = cost;
            task.deadline = deadline;
        } else {
            const newTask = {
                id: Date.now(),
                name,
                cost,
                deadline,
                order: tasks.length + 1
            };
            tasks.push(newTask);
        }

        closeModalFunc();
        renderTasks();
    });

    // para editar tarefa
    window.editTask = function(id) {
        const task = tasks.find(t => t.id === id);
        document.getElementById("taskName").value = task.name;
        document.getElementById("taskCost").value = task.cost;
        document.getElementById("taskDeadline").value = task.deadline;
        editTaskId = id;
        document.addEventListener("DOMContentLoaded", function() {
            let tasks = [];
            const taskList = document.getElementById("taskList");
            const taskModal = document.getElementById("taskModal");
            const addTaskBtn = document.getElementById("addTaskBtn");
            const closeModal = document.getElementById("closeModal");
            const taskForm = document.getElementById("taskForm");
            let editTaskId = null;
        
            // Função para renderizar a lista de tarefas
            function renderTasks() {
                taskList.innerHTML = "";
                
                // Ordena as tarefas e renderiza cada uma delas
                tasks.sort((a, b) => a.order - b.order).forEach((task, index) => {
                    const row = document.createElement("tr");
        
                    // Aplica a classe "highlight" se o custo for >= 1000
                    if (task.cost >= 1000) {
                        row.classList.add("highlight");
                    }
        
                    // Insere os dados da tarefa na linha
                    row.innerHTML = `
                        <td>${task.name}</td>
                        <td>R$ ${task.cost.toFixed(2)}</td>
                        <td>${task.deadline}</td>
                        <td>${generateTaskButtons(task.id, index)}</td>
                    `;
        
                    taskList.appendChild(row);
                });
            }
        
            // Função para gerar os botões de ação (edição, exclusão, mover para cima/baixo)
            function generateTaskButtons(id, index) {
                return `
                    <button onclick="editTask(${id})">✏️</button>
                    <button onclick="deleteTask(${id})">🗑️</button>
                    <button class="move-up" onclick="moveTaskUp(${id})" ${index === 0 ? 'disabled' : ''}>⬆️</button>
                    <button class="move-down" onclick="moveTaskDown(${id})" ${index === tasks.length - 1 ? 'disabled' : ''}>⬇️</button>
                `;
            }
        
            // Função para mover a tarefa para cima
            window.moveTaskUp = function(id) {
                const index = tasks.findIndex(task => task.id === id);
                if (index > 0) {
                    [tasks[index - 1].order, tasks[index].order] = [tasks[index].order, tasks[index - 1].order];
                    renderTasks();
                }
            };
        
            // Função para mover a tarefa para baixo
            window.moveTaskDown = function(id) {
                const index = tasks.findIndex(task => task.id === id);
                if (index < tasks.length - 1) {
                    [tasks[index + 1].order, tasks[index].order] = [tasks[index].order, tasks[index + 1].order];
                    renderTasks();
                }
            };
        
            // Função para abrir o modal
            function openModal(isEdit = false) {
                taskModal.style.display = "flex";
                document.getElementById("modalTitle").innerText = isEdit ? "Editar Tarefa" : "Incluir Tarefa";
            }
        
            // Função para fechar o modal
            function closeModalFunc() {
                taskModal.style.display = "none";
                taskForm.reset();
                editTaskId = null;
            }
        
            // Evento de clique para abrir o modal de inclusão
            addTaskBtn.addEventListener("click", () => {
                openModal();
            });
        
            // Evento para fechar o modal
            closeModal.addEventListener("click", closeModalFunc);
        
            // Submissão do formulário para salvar a tarefa
            taskForm.addEventListener("submit", function(event) {
                event.preventDefault();
                const name = document.getElementById("taskName").value;
                const cost = parseFloat(document.getElementById("taskCost").value);
                const deadline = document.getElementById("taskDeadline").value;
        
                // Edita ou cria uma nova tarefa
                if (editTaskId) {
                    const task = tasks.find(t => t.id === editTaskId);
                    task.name = name;
                    task.cost = cost;
                    task.deadline = deadline;
                } else {
                    const newTask = {
                        id: Date.now(),
                        name,
                        cost,
                        deadline,
                        order: tasks.length + 1
                    };
                    tasks.push(newTask);
                }
        
                closeModalFunc();
                renderTasks();
            });
        
            // Função para editar uma tarefa
            window.editTask = function(id) {
                const task = tasks.find(t => t.id === id);
                document.getElementById("taskName").value = task.name;
                document.getElementById("taskCost").value = task.cost;
                document.getElementById("taskDeadline").value = task.deadline;
                editTaskId = id;
                openModal(true);
            };
        
            // Função para excluir uma tarefa
            window.deleteTask = function(id) {
                if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
                    tasks = tasks.filter(t => t.id !== id);
                    renderTasks();
                }
            };
        
            // Renderiza a lista de tarefas ao carregar a página
            renderTasks();
        });
        
        openModal(true);
    }

    // para excluir tarefa
    window.deleteTask = function(id) {
        if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
            tasks = tasks.filter(t => t.id !== id);
            renderTasks();
        }
    }

    renderTasks();
    
});

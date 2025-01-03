// Variáveis globais para controlar o mês e ano
let currentMonth = new Date().getMonth(); // 0-11
let currentYear = new Date().getFullYear();

// Objeto para armazenar os lembretes de dois usuários
let reminders = {
    user1: {},
    user2: {}
};

// Função para gerar o calendário para o mês e ano atual
function generateCalendar(month, year) {
    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Dia da semana do 1º dia do mês
    //firstDayOfMonth === os dias da semana que não existem na 1º semana do calendário que tem 5 semanas
    
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Quantos dias tem o mês
    const today = new Date(); // Para destacar o dia atual

    // Atualiza o título do mês e ano
    document.getElementById("month-year").textContent = `${monthNames[month]} ${year}`;

    // Limpa os dias anteriores
    const calendarDays = document.getElementById("calendar-days");
    calendarDays.innerHTML = '';
    

    // Adiciona os dias do mês
    console.log(firstDayOfMonth);
    //                       3
    for (let i = 1; i <= firstDayOfMonth; i++) {
        const emptyDay = document.createElement("div");
        console.log(emptyDay);
        
        calendarDays.appendChild(emptyDay); // Espaços em branco antes do 1º dia do mês        
        
    }

    // Adiciona os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.textContent = day;

        // Verifica se é o dia de hoje
        if (today.getDate() === day && today.getMonth() === month && today.getFullYear() === year) {
            dayElement.classList.add("today");
        }

        // Verifica se há lembretes para o dia e exibe-os
        const reminderKey = `${year}-${month + 1}-${day}`;
        if (reminders.user1[reminderKey]) {
            dayElement.classList.add("user1");
        }
        if (reminders.user2[reminderKey]) {
            dayElement.classList.add("user2");
        }

        // Adiciona evento de clique no dia
        dayElement.classList.add("active");
        dayElement.onclick = () => openModal(day, month, year);

        calendarDays.appendChild(dayElement);
    }
}

// Função para mudar o mês
function changeMonth(direction) {
    currentMonth += direction;

    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    generateCalendar(currentMonth, currentYear);
}

// Função para abrir o modal de lembrete
function openModal(day, month, year) {
    const reminderDate = `${year}-${month + 1}-${day}`;
    document.getElementById("reminder-date").value = reminderDate;
    document.getElementById("reminder-text").value = '';

    // Exibe o modal
    document.getElementById("reminder-modal").style.display = "flex";
}

// Função para fechar o modal
function closeModal() {
    document.getElementById("reminder-modal").style.display = "none";
}

// Função para salvar o lembrete
function saveReminder() {
    const reminderDate = document.getElementById("reminder-date").value;
    const user = document.getElementById("reminder-user").value;
    const reminderText = document.getElementById("reminder-text").value;

    // Armazena o lembrete para o usuário
    reminders[user][reminderDate] = reminderText;

    // Fecha o modal
    closeModal();

    // Atualiza o calendário
    generateCalendar(currentMonth, currentYear);
}

// Gera o calendário inicial
generateCalendar(currentMonth, currentYear);

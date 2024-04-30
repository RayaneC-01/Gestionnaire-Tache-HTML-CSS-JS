// Fonction pour ajouter une nouvelle tâche
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    var priorityInput = document.getElementById("priorityInput");
    var priorityValue = parseInt(priorityInput.value.trim());

    var reminderInput = document.getElementById("reminderInput");
    var reminderValue = reminderInput.value;

    var customDateInput = document.getElementById("customDateInput");
    var customDateValue = customDateInput.value;

    var errorMessage = document.getElementById("errorMessage");

    if (taskText !== "" && priorityValue >= 1 && priorityValue <= 4) {
        errorMessage.textContent = ""; // Effacer le message d'erreur précédent

        var taskListItem = document.createElement("li");
        taskListItem.classList.add("task", "task-" + priorityValue);

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function () {
            taskListItem.classList.toggle("completed");
        });

        var taskTextElement = document.createElement("span");
        taskTextElement.textContent = taskText;

        var priorityTextElement = document.createElement("span");
        priorityTextElement.textContent = "Priority: " + priorityValue;

        var deleteButton = document.createElement("button"); // Bouton de suppression
        deleteButton.textContent = "Supprimer";
        deleteButton.classList.add("btn", "btn-danger", "ml-2");
        deleteButton.onclick = function () {
            Swal.fire({
                title: 'Êtes-vous sûr?',
                text: 'Vous ne pourrez pas revenir en arrière!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer!',
                cancelButtonText: 'Annuler'
            }).then((result) => {
                if (result.isConfirmed) {
                    taskListItem.remove(); // Supprimer l'élément de la liste
                    saveTasks(); // Sauvegarder les tâches mises à jour
                    Swal.fire(
                        'Supprimé!',
                        'La tâche a été supprimée.',
                        'success'
                    );
                }
            });
        };
        var reminderTextElement = document.createElement("span");
        reminderTextElement.textContent = "Rappel: " + getReminderText(reminderValue, customDateValue);
        console.log(taskInput);
        taskListItem.appendChild(checkbox);
        taskListItem.appendChild(taskTextElement);
        taskListItem.appendChild(priorityTextElement);
        taskListItem.appendChild(reminderTextElement);
        taskListItem.appendChild(deleteButton); // Ajouter le bouton de suppression
        var taskList = document.getElementById("taskList");
        taskList.appendChild(taskListItem);

        // Nettoyer les champs de saisie après l'ajout de la tâche
        taskInput.value = "";
        priorityInput.value = "";
        reminderInput.value = "today"; // Réinitialiser la sélection à "Aujourd'hui"
        customDateInput.value = ""; // Réinitialiser la date personnalisée

        saveTasks();
    } else {
        errorMessage.textContent = "La priorité doit être un nombre entre 1 et 4."; // Afficher le message d'erreur
    }
}

function getReminderText(reminderValue, customDateValue) {
    switch (reminderValue) {
        case "today":
            return "Aujourd'hui";
        case "tomorrow":
            return "Demain";
        case "2weeks":
            return "Dans 2 semaines";
        case "choose_date":
            return customDateValue ? customDateValue : "Date personnalisée";
        default:
            return "";
    }
}

// Fonction pour afficher ou masquer l'entrée de date personnalisée en fonction de la sélection de l'utilisateur
document.getElementById("reminderInput").addEventListener("change", function () {
    var customDateInput = document.getElementById("customDateInput");
    var reminderValue = this.value;
    customDateInput.classList.toggle("d-none", reminderValue !== "custom");
});



// Fonction pour sauvegarder les tâches dans le LocalStorage
function saveTasks() {
    var taskList = document.getElementById("taskList").innerHTML;
    try {
        localStorage.setItem("taskList", taskList);
    } catch (error) {
        console.error("Erreur lors de la sauvegarde des tâches:", error);
    }
}

// Fonction pour charger les tâches depuis le LocalStorage
// Fonction pour charger les tâches depuis le LocalStorage
function loadTasks() {
    try {
        var taskList = localStorage.getItem("taskList");
        if (taskList) {
            document.getElementById("taskList").innerHTML = taskList;
        }
    } catch (error) {
        console.error("Erreur lors du chargement des tâches:", error);
    }
}
// Appeler loadTasks au chargement de la page
window.onload = loadTasks;
// Fonction pour ajouter une nouvelle tâche
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    let priorityInput = document.getElementById("priorityInput");
    let priorityValue = parseInt(priorityInput.value.trim());

    let errorMessage = document.getElementById("errorMessage");

    if (taskText !== "" && priorityValue >= 1 && priorityValue <= 4) {
        errorMessage.textContent = ""; // Effacer le message d'erreur précédent

        let taskListItem = document.createElement("li");
        taskListItem.classList.add("task", "task-" + priorityValue);

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function () {
            taskListItem.classList.toggle("completed");
        });

        let taskTextElement = document.createElement("span");
        taskTextElement.textContent = taskText;

        let priorityTextElement = document.createElement("span");
        priorityTextElement.textContent = "Priority: " + priorityValue;

        let deleteButton = document.createElement("button"); // Bouton de suppression
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
            }).then(function (result) {
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
        console.log(taskInput);
        taskListItem.appendChild(checkbox);
        taskListItem.appendChild(taskTextElement);
        taskListItem.appendChild(priorityTextElement);
        taskListItem.appendChild(deleteButton); // Ajouter le bouton de suppression
        let taskList = document.getElementById("taskList");
        taskList.appendChild(taskListItem);

        // Nettoyer les champs de saisie après l'ajout de la tâche
        taskInput.value = "";
        priorityInput.value = "";

        saveTasks();
    } else {
        errorMessage.textContent = "La priorité doit être un nombre entre 1 et 4."; // Afficher le message d'erreur
    }
}

// Fonction pour sauvegarder les tâches dans le LocalStorage
function saveTasks() {
    let taskList = document.getElementById("taskList").innerHTML;
    try {
        localStorage.setItem("taskList", taskList);
    } catch (error) {
        console.error("Erreur lors de la sauvegarde des tâches:", error);
    }
}
// Fonction pour charger les tâches depuis le LocalStorage
function loadTasks() {
    try {
        let taskList = localStorage.getItem("taskList");
        if (taskList) {
            document.getElementById("taskList").innerHTML = taskList;
        }
    } catch (error) {
        console.error("Erreur lors du chargement des tâches:", error);
    }
}
// Appeler loadTasks au chargement de la page
window.onload = loadTasks;


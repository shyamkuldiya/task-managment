export function taskStatus(status) {
    if (!status) {
        return {
            class: '',
            status: ''
        }
    }
    if (status === 'pending') {
        return {
            class: 'bg-yellow-500',
            status: 'Pending'
        }
    } else if (status === 'completed') {
        return {
            class: 'bg-green-500',
            status: 'Completed'
        }
    } else if (status === 'in_progress') {
        return {
            class: 'bg-blue-500',
            status: 'In Progress'
        }
    } else if (status === 'cancelled') {
        return {
            class: 'bg-red-500',
            status: "Cancelled"
        }
    }
}

export function isValidTask(taskInformation) {
    if (taskInformation.task != '' &&
        taskInformation.description != '' &&
        taskInformation.status != '' &&
        taskInformation.dueDate != '' &&
        taskInformation.assignedOnDate != ''
    ) {
        return true
    } else {
        return false;
    }
}


export const getTasksFromLocalStorage = () => {
    const savedTasks = localStorage.getItem('tasks');
    try {
        return savedTasks ? JSON.parse(savedTasks) : []; // when no task but key is there
    } catch (error) {
        return []; // when there is no key in local storage
    }
};

export const saveTasksToLocalStorage = (tasks) => {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
    }
};

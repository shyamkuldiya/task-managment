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

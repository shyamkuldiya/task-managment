import * as z from 'zod';

export const taskSchema = z.object({
    task: z.string().nonempty('Task name is required'),
    // assignedTo: z.string().nonempty('Assigned To field is required'),
    dueDate: z.string().nonempty('Due date is required'),
    status: z.string().nonempty('Status is required'),
    description: z.string().optional(),
});

import React from 'react'
import AppLayout from '../../Layout/AppLayout'
import { ColumnDirective, ColumnsDirective, KanbanComponent } from '@syncfusion/ej2-react-kanban'

export default function Dashboard() {
    return (
        <AppLayout>
            <KanbanComponent id="kanban" keyField="Status">
                <ColumnsDirective>
                    <ColumnDirective headerText='To Do' keyField='Todo'  />
                </ColumnsDirective>
            </KanbanComponent>
        </AppLayout>
    )
}

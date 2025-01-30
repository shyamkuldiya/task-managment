import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <div className="flex items-center cursor-pointer">
            <Sun
                className="h-4 w-4 rotate-0 scale-100 block transition-all dark:-rotate-90 dark:scale-0"
                onClick={() => setTheme("dark")}
            />
            <Moon
                onClick={() => setTheme("light")}
                className="absolute h-4 w-4 rotate-90 block scale-0 transition-all dark:rotate-0 dark:scale-100"
            />

        </div>
    )
}

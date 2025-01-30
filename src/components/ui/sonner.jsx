import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    (<Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast dark:group-[.toaster]:bg-zinc-800 group-[.toaster]:bg-gray-200  group-[.toaster]:border-border group-[.toaster]:shadow-lg bg-gray-200 dark:bg-zinc-800",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            success:'text-green-500',
            warning:'text-yellow-500',
            error:'text-red-500',
            info:'text-blue-500',
        },
      }}
      {...props} />)
  );
}

export { Toaster }

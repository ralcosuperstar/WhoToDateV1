import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            key={id} 
            variant="pink"
            {...props}
          >
            <div className="grid gap-1">
              {title && <ToastTitle className="text-[#e83a8e] font-medium">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-gray-600">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="rounded-full h-6 w-6 border border-[#e83a8e]/20 text-[#e83a8e] opacity-70 transition-opacity hover:opacity-100 hover:bg-[#e83a8e]/5 focus:outline-none focus:ring-1 focus:ring-[#e83a8e]/30 focus:ring-offset-1" />
          </Toast>
        )
      })}
      <ToastViewport className="p-4 md:p-6" />
    </ToastProvider>
  )
}

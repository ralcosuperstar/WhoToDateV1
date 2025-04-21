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
        // Determine style based on variant
        let titleClass = "font-medium text-gray-800";
        let descriptionClass = "text-gray-600";
        let closeClass = "rounded-full h-6 w-6 border border-gray-200 text-gray-500 opacity-70 transition-opacity hover:opacity-100 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1";
        
        if (props.variant === "pink") {
          titleClass = "font-medium text-[#e83a8e]";
          closeClass = "rounded-full h-6 w-6 border border-[#e83a8e]/20 text-[#e83a8e] opacity-70 transition-opacity hover:opacity-100 hover:bg-[#e83a8e]/5 focus:outline-none focus:ring-1 focus:ring-[#e83a8e]/30 focus:ring-offset-1";
        } else if (props.variant === "success") {
          titleClass = "font-medium text-[#10b981]";
          closeClass = "rounded-full h-6 w-6 border border-[#10b981]/20 text-[#10b981] opacity-70 transition-opacity hover:opacity-100 hover:bg-[#10b981]/5 focus:outline-none focus:ring-1 focus:ring-[#10b981]/30 focus:ring-offset-1";
        } else if (props.variant === "destructive") {
          titleClass = "font-medium text-red-600";
          descriptionClass = "text-red-700/80";
          closeClass = "rounded-full h-6 w-6 border border-red-200 text-red-500 opacity-70 transition-opacity hover:opacity-100 hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-300 focus:ring-offset-1";
        }

        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle className={titleClass}>{title}</ToastTitle>}
              {description && <ToastDescription className={descriptionClass}>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose className={closeClass} />
          </Toast>
        )
      })}
      <ToastViewport className="p-4 md:p-6" />
    </ToastProvider>
  )
}

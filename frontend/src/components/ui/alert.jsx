import * as React from "react"

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => {
  const variantClasses = {
    default: "bg-background text-foreground",
    destructive: "bg-red-100 text-red-700 border-red-400",
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={`relative w-full rounded-lg border p-4 ${variantClasses[variant || "default"]} ${className}`}
      {...props}
    />
  )
})
Alert.displayName = "Alert"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm [&_p]:leading-relaxed ${className}`}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription }
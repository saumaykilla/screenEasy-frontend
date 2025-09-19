interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className={`${sizeClasses[size]} bg-blue-600 rounded-lg flex items-center justify-center`}>
      <span className="text-white font-bold text-sm">SE</span>
    </div>
  );
}

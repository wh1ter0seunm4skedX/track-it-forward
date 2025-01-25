import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  children: React.ReactNode;
  animated?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  icon: Icon,
  children,
  animated = false,
  className = '',
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  const animation = animated ? 'animate-pulse' : '';

  return (
    <span
      className={`
        inline-flex items-center gap-1 font-medium rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${animation}
        ${className}
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </span>
  );
};
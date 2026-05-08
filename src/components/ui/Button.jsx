'use client';

import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none tracking-tight';
  
  const variants = {
    primary: 'bg-primary text-white hover:shadow-[0_10px_20px_rgba(146,50,147,0.2)] hover:-translate-y-0.5',
    secondary: 'bg-white text-foreground border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm',
    outline: 'bg-transparent border border-zinc-200 hover:border-primary/30 text-muted hover:text-foreground',
    ghost: 'bg-transparent hover:bg-zinc-100 text-muted hover:text-foreground',
  };
  
  const sizes = {
    sm: 'px-5 py-2 text-xs',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-10 py-5 text-base',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

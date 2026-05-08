import React from 'react';

export const Card = ({ children, className = '', hover = true }) => {
  return (
    <div className={`glass-card rounded-[2rem] overflow-hidden ${hover ? 'hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500' : ''} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 pb-0 ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

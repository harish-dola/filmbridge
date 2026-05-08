import React from 'react';

export const Section = ({ 
  children, 
  title, 
  subtitle, 
  className = '', 
  containerClassName = '',
  id 
}) => {
  return (
    <section id={id} className={`px-6 py-20 ${className}`}>
      <div className={`max-w-7xl mx-auto ${containerClassName}`}>
        {(title || subtitle) && (
          <div className="mb-12">
            {subtitle && (
              <p className="text-primary uppercase tracking-widest text-sm font-semibold">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-4xl md:text-5xl font-black mt-2 leading-tight">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  glowing?: boolean;
}

const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant = 'primary', size = 'md', glowing = false, children, ...props }, ref) => {
    const baseStyles = `
      relative font-pixel uppercase tracking-wider cursor-pointer
      border-4 border-wood-dark
      transition-none select-none
    `;

    const variants = {
      primary: `
        bg-primary text-primary-foreground
        shadow-[inset_-4px_-4px_0_0_hsl(var(--wood-dark)),inset_4px_4px_0_0_hsl(var(--wood-light)),4px_4px_0_0_hsl(var(--wood-dark))]
        hover:bg-accent hover:text-accent-foreground
        active:shadow-[inset_-4px_-4px_0_0_hsl(var(--wood-dark)),inset_4px_4px_0_0_hsl(var(--wood-light)),2px_2px_0_0_hsl(var(--wood-dark))]
        active:translate-x-[2px] active:translate-y-[2px]
      `,
      secondary: `
        bg-secondary text-secondary-foreground
        shadow-[inset_-4px_-4px_0_0_hsl(var(--wood-dark)/0.5),inset_4px_4px_0_0_hsl(var(--cream)/0.8),4px_4px_0_0_hsl(var(--wood-dark))]
        hover:bg-cream hover:text-foreground
        active:shadow-[inset_-4px_-4px_0_0_hsl(var(--wood-dark)/0.5),inset_4px_4px_0_0_hsl(var(--cream)/0.8),2px_2px_0_0_hsl(var(--wood-dark))]
        active:translate-x-[2px] active:translate-y-[2px]
      `,
    };

    const sizes = {
      sm: 'px-4 py-2 text-[8px]',
      md: 'px-6 py-3 text-[10px]',
      lg: 'px-8 py-4 text-xs',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          glowing && 'animate-pixel-pulse',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PixelButton.displayName = 'PixelButton';

export default PixelButton;

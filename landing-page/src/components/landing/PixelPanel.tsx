import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface PixelPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dark' | 'cream';
}

const PixelPanel = forwardRef<HTMLDivElement, PixelPanelProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: `
        bg-card
        border-4 border-border
        shadow-[inset_-4px_-4px_0_0_hsl(var(--wood-dark)/0.5),inset_4px_4px_0_0_hsl(var(--cream)/0.8),8px_8px_0_0_hsl(var(--wood-dark)/0.3)]
      `,
      dark: `
        bg-wood-medium
        border-4 border-wood-dark
        shadow-[inset_-4px_-4px_0_0_hsl(var(--wood-dark)),inset_4px_4px_0_0_hsl(var(--wood-light)),8px_8px_0_0_hsl(var(--wood-dark)/0.5)]
      `,
      cream: `
        bg-cream
        border-4 border-border
        shadow-[inset_-2px_-2px_0_0_hsl(var(--cream-dark)),inset_2px_2px_0_0_hsl(var(--cream)/0.5)]
      `,
    };

    return (
      <div
        ref={ref}
        className={cn('p-6', variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PixelPanel.displayName = 'PixelPanel';

export default PixelPanel;

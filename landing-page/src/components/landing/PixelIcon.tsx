import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface PixelIconProps extends HTMLAttributes<HTMLDivElement> {
  icon: 'document' | 'debate' | 'verdict' | 'brain' | 'scale' | 'gavel' | 'scroll';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const PixelIcon = forwardRef<HTMLDivElement, PixelIconProps>(
  ({ className, icon, size = 'md', animated = false, ...props }, ref) => {
    const sizes = {
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-20 h-20',
    };

    // Pixel art icons using CSS (8-bit style)
    const renderIcon = () => {
      switch (icon) {
        case 'document':
          return (
            <div className="relative w-8 h-10">
              {/* Document body */}
              <div className="absolute inset-0 bg-cream-dark border-2 border-foreground" />
              {/* Folded corner */}
              <div className="absolute top-0 right-0 w-3 h-3 bg-cream border-l-2 border-b-2 border-foreground" />
              {/* Text lines */}
              <div className="absolute top-3 left-1 w-4 h-1 bg-foreground" />
              <div className="absolute top-5 left-1 w-5 h-1 bg-foreground" />
              <div className="absolute top-7 left-1 w-3 h-1 bg-foreground" />
            </div>
          );
        case 'debate':
          return (
            <div className="relative w-12 h-8 flex items-center justify-between">
              {/* Left figure */}
              <div className="w-4 h-6 bg-lawyer-blue border-2 border-foreground" />
              {/* VS lightning */}
              <div className="flex flex-col gap-[2px]">
                <div className="w-1 h-1 bg-accent" />
                <div className="w-2 h-1 bg-accent -ml-[2px]" />
                <div className="w-1 h-1 bg-accent" />
              </div>
              {/* Right figure */}
              <div className="w-4 h-6 bg-lawyer-red border-2 border-foreground" />
            </div>
          );
        case 'verdict':
          return (
            <div className="relative w-10 h-10">
              {/* Gavel head */}
              <div className="absolute top-1 left-2 w-6 h-3 bg-wood-medium border-2 border-foreground" />
              {/* Gavel handle */}
              <div className="absolute top-3 left-4 w-2 h-6 bg-wood-light border-2 border-foreground" />
              {/* Impact lines */}
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-accent" />
              <div className="absolute bottom-0 left-3 w-1 h-1 bg-accent" />
              <div className="absolute bottom-1 right-2 w-1 h-1 bg-accent" />
            </div>
          );
        case 'brain':
          return (
            <div className="relative w-10 h-8">
              {/* Brain outline */}
              <div className="absolute top-0 left-1 w-8 h-6 bg-muted border-2 border-foreground rounded-t-full" />
              {/* Brain details */}
              <div className="absolute top-2 left-3 w-4 h-[2px] bg-foreground/50" />
              <div className="absolute top-4 left-2 w-5 h-[2px] bg-foreground/50" />
              {/* Sparks */}
              <div className="absolute -top-1 left-0 w-1 h-1 bg-accent" />
              <div className="absolute -top-1 right-1 w-1 h-1 bg-accent" />
            </div>
          );
        case 'scale':
          return (
            <div className="relative w-12 h-10">
              {/* Center pillar */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-8 bg-wood-medium border-2 border-foreground" />
              {/* Top bar */}
              <div className="absolute top-0 left-0 w-12 h-2 bg-wood-light border-2 border-foreground" />
              {/* Left plate */}
              <div className="absolute top-3 left-0 w-4 h-2 bg-accent border-2 border-foreground" />
              {/* Right plate */}
              <div className="absolute top-5 right-0 w-4 h-2 bg-accent border-2 border-foreground" />
            </div>
          );
        case 'gavel':
          return (
            <div className={cn("relative w-10 h-10", animated && "animate-gavel origin-bottom-right")}>
              {/* Gavel head */}
              <div className="absolute top-0 right-0 w-6 h-4 bg-wood-medium border-2 border-foreground rotate-[-30deg]" />
              {/* Handle */}
              <div className="absolute bottom-0 left-0 w-8 h-2 bg-wood-light border-2 border-foreground rotate-[-30deg]" />
            </div>
          );
        case 'scroll':
          return (
            <div className="relative w-8 h-10">
              {/* Scroll body */}
              <div className="absolute top-2 left-0 w-8 h-6 bg-cream border-2 border-foreground" />
              {/* Top roll */}
              <div className="absolute top-0 left-0 w-8 h-3 bg-cream-dark border-2 border-foreground rounded-t-sm" />
              {/* Bottom roll */}
              <div className="absolute bottom-0 left-0 w-8 h-3 bg-cream-dark border-2 border-foreground rounded-b-sm" />
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center',
          'bg-cream border-4 border-border',
          'shadow-[inset_-2px_-2px_0_0_hsl(var(--wood-dark)/0.4),inset_2px_2px_0_0_hsl(var(--cream)/0.8)]',
          sizes[size],
          className
        )}
        {...props}
      >
        {renderIcon()}
      </div>
    );
  }
);

PixelIcon.displayName = 'PixelIcon';

export default PixelIcon;

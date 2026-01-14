import { useEffect, useState, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
    children: ReactNode;
    animation?: 'fade-up' | 'slide-left' | 'slide-right' | 'fade-in' | 'pop-in';
    delay?: number;
    className?: string;
    threshold?: number;
    once?: boolean;
}

const ScrollReveal = ({
    children,
    animation = 'fade-up',
    delay = 0,
    className,
    threshold = 0.1,
    once = true,
}: ScrollRevealProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once && ref.current) {
                        observer.unobserve(ref.current);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [once, threshold]);

    const animationClasses = {
        'fade-up': 'animate-fade-up',
        'slide-left': 'animate-slide-left',
        'slide-right': 'animate-slide-right',
        'fade-in': 'animate-fade-in',
        'pop-in': 'animate-pop-in',
    };

    const delayClass = delay ? `delay-${delay}` : '';

    return (
        <div
            ref={ref}
            className={cn(
                'opacity-0',
                isVisible && animationClasses[animation],
                delayClass,
                className
            )}
            style={{ animationFillMode: 'forwards' }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;

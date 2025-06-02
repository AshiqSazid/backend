import { useState, useEffect } from 'react';

const useResponsive = () => {
    const [windowSize, setWindowSize] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWindowSize({
                isMobile: width < 768,          // Mobile: <768px
                isTablet: width >= 768 && width < 1024,  // Tablet: 768px-1023px
                isDesktop: width >= 1024,       // Desktop: ≥1024px
                width,
                height: window.innerHeight,
            });
        };

        // Set initial size
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

export default useResponsive;
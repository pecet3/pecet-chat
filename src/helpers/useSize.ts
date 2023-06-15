import { useState, useEffect } from 'react';


export const useSize = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
            setInnerHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { innerWidth, innerHeight }
}
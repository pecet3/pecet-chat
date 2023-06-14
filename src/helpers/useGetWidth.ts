import { useState, useEffect } from 'react';


export const useGetWidth = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);


    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);

        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return innerWidth
}
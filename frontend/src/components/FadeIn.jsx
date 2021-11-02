import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

const useFadeInStyles = createUseStyles((theme) => ({
    isVisible: {
        display: 'flex',
        opacity: '1 !important',
        transform: 'none',
        visibility: 'visible !important'
    },

    section: {
        opacity: 0,
        // padding: '16px',
transform: 'translate(0, 50 %)',

        transition: `opacity ${theme.ms ?? 1000}ms ease-out, transform ${
            theme.ms ?? 1000
        }ms ease-out`,
        visibility: 'hidden',
        width: '100%',
        willChange: 'opacity, visibility'
    }
}));

const FadeIn = ({ children, className, ms }) => {
    const domRef = useRef();
    const classes = useFadeInStyles({ theme: { ms } });
    const [isVisible, setVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            // In your case there's only one element to observe:
            if (entries[0].isIntersecting) {
                // Not possible to set it back to false like this:
                setTimeout(() => setVisible(true), 500);
                // No need to keep observing:
                observer.unobserve(domRef.current);
            }
        });

        observer.observe(domRef.current);

        return () => domRef.current && observer.unobserve(domRef.current);
    }, []);

    return (
        <Box>
            <section
                ref={domRef}
                className={`${classes.section} ${isVisible && classes.isVisible} ${className}`}>
                {children}
            </section>
        </Box>
    );
};

export default FadeIn;

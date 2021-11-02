import { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

const useFadeInStyles = createUseStyles({
    isVisible: {
        display: 'flex',
        opacity: 1,
        transform: 'none',
        visibility: 'visible'
    },

    section: {
        boxShadow: '0 0 8px rgba(0, 0, 0, .125)',
        height: '64px',
        margin: '16px',
        opacity: 0,
        padding: '16px',
        transform: 'translate(0, 50 %)',
        transition: 'opacity 300ms ease-out, transform 300ms ease-out',
        visibility: 'hidden',
        willChange: 'opacity, visibility'
    }
});

const FadeIn = ({ children }) => {
    const domRef = useRef();
    const classes = useFadeInStyles();
    const [isVisible, setVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            // In your case there's only one element to observe:
            if (entries[0].isIntersecting) {
                // Not possible to set it back to false like this:
                setVisible(true);

                // No need to keep observing:
                observer.unobserve(domRef.current);
            }
        });

        observer.observe(domRef.current);

        return () => observer.unobserve(domRef.current);
    }, []);

    return (
        <section ref={domRef} className={`${isVisible && classes.isVisible} ${classes.section}`}>
            {children}
        </section>
    );
};

export default FadeIn;

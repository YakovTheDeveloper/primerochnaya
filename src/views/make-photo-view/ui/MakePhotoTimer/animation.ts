export const stopStyles: Record<string, Partial<CSSStyleDeclaration>> = {
    init: {
        transform: 'translateY(0)',
        opacity: '1',
        width: '350px',
        fontSize: '150px',
        boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.01)',
        zIndex: '3'
    },
    first: {
        transform: 'translateY(220px)',
        opacity: '0.6',
        width: '300px',
        fontSize: '128px',
        boxShadow: '0px 0px 34.2857px rgba(0, 0, 0, 0.01)',
        zIndex: '2'

    },
    second: {
        transform: 'translateY(420px)',
        opacity: '0.2',
        width: '250px',
        fontSize: '107px',
        boxShadow: '0px 0px 28.5714px rgba(0, 0, 0, 0.01)',
        zIndex: '1'

    },
    out: {
        transform: 'translateY(500px)',
        opacity: '0',
        width: '200px'
    }
}

export const animationByStepAndCountdown: Record<number, Record<number, Partial<CSSStyleDeclaration>>> = {
    1: {
        5: stopStyles.init,
        4: stopStyles.first,
        3: stopStyles.second,
        2: stopStyles.out,
        1: stopStyles.out
    },
    2: {
        5: stopStyles.init,
        4: stopStyles.init,
        3: stopStyles.first,
        2: stopStyles.second,
        1: stopStyles.out
    },
    3: {
        5: stopStyles.init,
        4: stopStyles.init,
        3: stopStyles.init,
        2: stopStyles.first,
        1: stopStyles.second,
    },
    4: {
        5: stopStyles.init,
        4: stopStyles.init,
        3: stopStyles.init,
        2: stopStyles.init,
        1: stopStyles.first,
    },
    5: {
        5: stopStyles.init,
        4: stopStyles.init,
        3: stopStyles.init,
        2: stopStyles.init,
        1: stopStyles.init,
    }
}

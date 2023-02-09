import { GlobalStyles as MUIGlobalStyles } from '@mui/material';

export function GlobalStyles() {
    return (
        <MUIGlobalStyles styles={{
            '*': {
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
            },
            html: {
                width: '100%',
                height: '100%',
                WebkitOverflowScrolling: 'touch',
            },
            body: {
                width: '100%',
                height: '100%',
                backgroundColor: 'lightgrey',
                padding: '15px'
            },
        }}/>
    );
}

import { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';

type Props = {
    children: ReactNode
}

export function NotistackProvider({ children }: Props) {
    return (
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            autoHideDuration={2000}
        >
            {children}
        </SnackbarProvider>
    );
}

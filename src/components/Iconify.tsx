import {
    Box,
    BoxProps,
    SxProps
} from '@mui/material';
import { Icon, IconifyIcon } from '@iconify/react';

interface IconifyProps extends BoxProps {
    icon: IconifyIcon | string,
    sx?: SxProps
}

export function Iconify({ icon, sx, ...props }: IconifyProps) {
    return (
        <Box component={Icon} icon={icon} sx={{...sx}} {...props}></Box>
    );
}


import { FC } from "react";
import { Grid } from '@mui/material';
import { RingLoader }
    from "react-spinners";

const Loading: FC<{
    color?: string,
    size?: number
}> = ({ color, size }) => {

    return (
        <>
            <Grid container sx={{ height: '100%' }} justifyContent={'center'} alignContent={'center'}>
                <RingLoader
                    size={size ?? 100}
                    color={color ?? "#6870fa"}
                />
            </Grid>
        </>
    )
}

export default Loading
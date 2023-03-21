import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


interface ButtonProps{
  onSetTwoMinutes: () => void;
  onSetFiveMinutes: () => void;
  onSetTenMinutes: () => void;

}
export default function ButtonsTimer(props : ButtonProps) {

  return (
    <ButtonGroup sx={{display: "flex", alignItems: "center", justifyContent: "center"}} variant="outlined" aria-label="outlined primary button group">
      <Button onClick={props.onSetTwoMinutes} size='small' color='primary'>2 minutes</Button>
      <Button onClick={props.onSetFiveMinutes} size='small' color='secondary'>5 minutes</Button>
      <Button onClick={props.onSetTenMinutes} size='small' color='info'>10 minutes</Button>
    </ButtonGroup>
  );
}
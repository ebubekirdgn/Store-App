import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "../counter/counterSlice";

export default function Counter() {
  const value = useSelector((state) => state.counter.value); // Redux store'dan state verisi okumak için kullanılır.  
  const dispatch = useDispatch(); // Redux store'a action göndermek için kullanılır. 

  return (
    <>
      <Typography>{value}</Typography>
      <ButtonGroup>
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        <Button onClick={() => dispatch(incrementByAmount(5))}>
          Increment By Value
        </Button>
      </ButtonGroup>
    </>
  );
}

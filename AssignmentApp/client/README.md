# How to use component

This codebase contain a component called ```T9Keyboard``` component which takes a state and state setter.

Please copy the references codes and the missing packages.

To use this within your code, you can use it as following:

```javascript
  ...
  const [output, setOutput] = useState("");
  const outputRef = useRef(output);
  useEffect(() => {
    outputRef.current = output;
  }, [output]);
  ...
  <T9Keyboard output={output} setOutput={setOutput} />
  ...
```

```output``` would always reflect the value that has been inputted.

If you do not have the T9 Arduino keyboard connected, you can use numkey 2-9; arrow keys; Backspace and Enter as input.

With an Arduino keyboard connected, a NodeJS server would send Socket.io signals from port 4000, this component would receive those signals and trigger actions accordingly.

The following actions are transmitted:

- Button 2-9: Input numbers 2-9 respectively
- Joystick Up: Move selection up
- Joystick Down: Move selection down
- Joystick Left: Delete last digit
- Joystick Right: Clear input
- Button 10/Action Button: Select current suggestion

When received Button 10 + Button 6, the component receives this as a delete input.

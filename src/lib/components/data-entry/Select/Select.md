Select

```jsx
import { Select } from 'react-kmp';

initialState = { value: 2 };

const handleChange = value => setState({ value });

const testOptions = [
    { 1: 'Test option 1' },
    { 2: 'Test option 2' },
    { 3: 'Test option 3' },
    { 4: 'Test option 4' },
    { 5: 'Test option 5' },
    { 6: 'Test option 6' },
    { 7: 'Test option 7' },
    { 8: 'Test option 8' },
    { 9: 'Test option 9' },
    { 10: 'Test option 10' },
    { 11: 'Test option 11' },
    { 12: 'Test option 12' },
];

<Select
    name="select"
    onChangeHandler={handleChange}
    options={testOptions}
    value={state.value}
    hasClear
    onClearHandler={() => setState({ value: null })}
/>;
```

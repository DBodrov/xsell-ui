DatePicker

```jsx
import { DatePicker } from 'react-kmp';

const getInitDate = () => {
    const now = new Date();
    const initYear = now.getFullYear() - 18;
    const initMonth = now.getMonth();
    const initDay = now.getDate();
    const initDate = new Date(initYear, initMonth, initDay).toLocaleDateString('ru');
    return initDate;
};

initialState = { value: getInitDate() };

const handleChange = value => {
    setState({ value });
};
<div style={{ padding: '5px', width: '100%', position: 'relative' }}>
    <DatePicker
        name="date"
        onChangeHandler={handleChange}
        onBlurHandler={console.log}
        value={state.value}
        placeholder="ДД.ММ.ГГГГ"
        showCurrent
        maxDate={getInitDate()}
        styles={{ width: '320px', margin: 'auto' }}
    />
</div>;
```

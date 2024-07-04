import "./style.css";
import usePeopleCounterStore from "../../../stores/usePeopleCounterStore";

const MIN_COUNT = 1;
const MAX_COUNT = 24;

export default function PeopleCounter() {
  const { count, increment, decrement, setCount } = usePeopleCounterStore(
    (state) => ({
      count: state.count,
      increment: state.increment,
      decrement: state.decrement,
      setCount: state.setCount,
    })
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= MIN_COUNT && value <= MAX_COUNT) {
      setCount(value);
    }
  };

  return (
    <div className="trial-people-count">
      <span>인원수</span>
      <div className="people-counter">
        <button className="counter-button" onClick={decrement}>
          <img src="/images/minus.svg" alt="마이너스 아이콘" />
        </button>
        <input
          className="counter-number"
          type="number"
          min={MIN_COUNT}
          max={MAX_COUNT}
          value={count}
          onChange={handleInputChange}
        />
        <button className="counter-button" onClick={increment}>
          <img src="/images/plus.svg" alt="플러스 아이콘" />
        </button>
      </div>
    </div>
  );
}

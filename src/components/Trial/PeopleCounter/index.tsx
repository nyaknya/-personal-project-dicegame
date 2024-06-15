import "./style.css";
import usePeopleCounterStore from "../../../stores/usePeopleCounterStore";

export default function PeopleCounter() {
  const count = usePeopleCounterStore((state) => state.count);
  const increment = usePeopleCounterStore((state) => state.increment);
  const decrement = usePeopleCounterStore((state) => state.decrement);
  const setCount = usePeopleCounterStore((state) => state.setCount);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 1 && value <= 24) {
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
          min="1"
          max="24"
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

interface SelectBoxProps {
  checked: boolean;
  onChange: () => void;
}

export default function SelectBox({ checked, onChange }: SelectBoxProps) {
  return (
    <div className="select-box">
      <input type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );
}

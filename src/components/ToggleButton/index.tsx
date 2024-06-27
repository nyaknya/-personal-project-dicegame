import "./style.css";

interface ToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ToggleButton({ isOpen, onToggle }: ToggleButtonProps) {
  return (
    <div className="close-button" onClick={onToggle}>
      <img src="/images/sidebar.svg" alt="토글 아이콘" />
    </div>
  );
}

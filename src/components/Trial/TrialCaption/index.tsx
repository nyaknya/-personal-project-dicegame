interface TrialCaptionProps {
  count: number;
  aggressive: number;
  creativity: number;
  kindness: number;
}

export default function TrialCaption({
  count,
  aggressive,
  creativity,
  kindness,
}: TrialCaptionProps) {
  return (
    <ul className="trial-caption">
      <li>참여 인원 : {count}명</li>
      <li>호전성 총합 : {aggressive}</li>
      <li>창의성 총합 : {creativity}</li>
      <li>이타성 총합 : {kindness}</li>
    </ul>
  );
}

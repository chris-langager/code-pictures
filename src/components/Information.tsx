interface Props {}
export const Information: React.FC<Props> = ({}) => {
  return (
    <div className="information">
      <h1>Code Pictures</h1>

      <p>Link to this game. (click to copy)</p>

      <p>Score</p>
      <ul>
        <li>Red - 0</li>
        <li>Blue - 0</li>
      </ul>

      <p>Cards remaining:</p>
      <ul>
        <li>Red - 9</li>
        <li>Blue - 8</li>
      </ul>

      <p>It's the Red teams turn!</p>
    </div>
  );
};

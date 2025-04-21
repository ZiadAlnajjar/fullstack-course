import { NonSensitiveDiaryEntry } from '../types.ts';

const Entry = ({
  entry : { date, visibility, weather }
}: Props) => (
    <div>
        <h3>{date}</h3>
        <p>visibility: {visibility}</p>
        <p>weather: {weather}</p>
    </div>
);

export default Entry;

interface Props {
    entry: NonSensitiveDiaryEntry;
}

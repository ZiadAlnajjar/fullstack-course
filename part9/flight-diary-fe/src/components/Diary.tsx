import { NonSensitiveDiaryEntry} from '../types.ts';
import { use } from 'react';
import Entry from './Entry.tsx';

const Diary = ({ getDiary }: Props) => {
    const entries: NonSensitiveDiaryEntry[] = use(getDiary);

    return (
        <>
            <h2>Diary entries</h2>
            {entries.map((entry) => (
                <Entry key={entry.id} entry={entry} />
            ))}
        </>
    )
};

export default Diary;

interface Props {
    getDiary: Promise<NonSensitiveDiaryEntry[]>;
}

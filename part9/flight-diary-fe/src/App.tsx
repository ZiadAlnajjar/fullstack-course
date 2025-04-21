import AddEntry from './components/AddEntry';
import Diary from './components/Diary';
import { Suspense, useMemo, useState } from 'react';
import { getDiary } from './services/diaryService.ts';
import './app.css';

const App = () => {
    const [version, setVersion] = useState<number>(0);
    const refetch = useMemo(() => () => setVersion(prev => prev + 1), []);


    return (
        <>
            <AddEntry refetch={refetch} />
            <Suspense fallback={<div>Loading...</div>}>
                <Diary getDiary={getDiary(version)} />
            </Suspense>
        </>
    );
};

export default App

import {Visibility, Weather} from '../types.ts';
import { getEnumArr } from '../utils.ts';
import { useActionState, useEffect, useState } from 'react';
import { createEntry } from '../services/diaryService.ts';
import axios from 'axios';

const AddEntry = ({ refetch }: Props) => {
    const [date, setDate] = useState((new Date()).toISOString().split('T')[0]);
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Ok);
    const [weather, setWeather] = useState<Weather>(Weather.Sunny);
    const [comment, setComment] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleAddEntry = async (): Promise<void> => {
        try {
            await createEntry({
                date,
                visibility,
                weather,
                comment,
            });
            setComment('');
            refetch();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data);
            }
        }
    }

    const [_state, addEntry, isPending] = useActionState(handleAddEntry, null);

    useEffect(() => {
        let alertTimer: number | undefined;

        if (error) {
            alertTimer = setTimeout(() => {
                setError('');
            }, 5 * 1000);
        }

        return () => clearTimeout(alertTimer);
    }, [error]);

    return (
        <>
            <h2>Add new entry</h2>
            {error ? <p className='alert-error'>{error}</p> : null}
            <form action={addEntry}>
                <input
                    type='date'
                    name='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <div>
                    {getEnumArr(Visibility).map((option: Visibility) => (
                        <label key={`${option}-${visibility}`}>
                            <input
                                type='radio'
                                name='visibility'
                                value={option}
                                onChange={() => setVisibility(option)}
                                checked={visibility == option}
                            />
                            {option}
                        </label>
                    ))}
                </div>
                <div>
                    {getEnumArr(Weather).map((option: Weather) => (
                        <label key={`${option}-${weather}`}>
                            <input
                                type='radio'
                                name='weather'
                                value={option}
                                onChange={() => setWeather(option)}
                                checked={weather === option}
                            />
                            {option}
                        </label>
                    ))}
                </div>
                <input
                    type='text'
                    name='comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type='submit' disabled={isPending}>add</button>
            </form>
        </>
    )
};

export default AddEntry;

interface Props {
    refetch: () => void;
}

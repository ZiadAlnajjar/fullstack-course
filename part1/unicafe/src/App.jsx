import {useState} from 'react'

const Button = ({text, onClick}) => (
    <button onClick={onClick}>{text}</button>
)

const Feedback = ({rateGood, rateNeutral, rateBad}) => {
    return (
        <>
            <h1>give feedback</h1>
            <div>
                <Button text="good" onClick={rateGood} />
                <Button text="neural" onClick={rateNeutral} />
                <Button text="bad" onClick={rateBad} />
            </div>
        </>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const getTotal = () => (good * 1) + (bad * -1);

    const getCount = () => good + neutral + bad;

    const getAverage = () => getTotal() / getCount();

    const getPositive = () => (good / getCount()) * 100;

    if (getCount() === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <StatisticLine name="good" value={good} />
                    <StatisticLine name="neural" value={neutral} />
                    <StatisticLine name="bad" value={bad} />
                    <StatisticLine name="average" value={getAverage()} />
                    <StatisticLine name="positive" value={`${getPositive()} %`} />
                </tbody>
            </table>
        </div>
    )
}

const StatisticLine = ({name, value}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{value}</td>
        </tr>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const rate = (value, setValue) => () => {
        setValue(value + 1)
    }

    return (
        <div>
            <Feedback
                rateGood={rate(good, setGood)}
                rateNeutral={rate(neutral, setNeutral)}
                rateBad={rate(bad, setBad)}
            />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App
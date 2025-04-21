import { CoursePart } from "../types.ts";

export const Total = ({ parts }: Props) => {
    const totalExercises = parts.reduce((acc, { exerciseCount }) => acc + exerciseCount, 0);

    return (
        <b>Number of exercises {totalExercises}</b>
    );
};

interface Props {
    parts: CoursePart[],
}

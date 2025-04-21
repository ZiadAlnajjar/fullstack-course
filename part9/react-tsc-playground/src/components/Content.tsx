import {CoursePart} from "../types.ts";
import Part from "./Part.tsx";

export const Content = ({ parts }: Props) => (
    <>
        {parts.map((part) => (
            <Part key={part.name} part={part} />
        ))}
    </>
);

interface Props {
    parts: CoursePart[],
}

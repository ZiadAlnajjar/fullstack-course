import { CoursePart } from "../types.ts";
import { assertNever } from "../utils.ts";

const Part = ({ part }: Props) => {
    let courseInfo = <></>;

    switch (part.kind) {
        case "basic":
            courseInfo = <b>{part.description}</b>;
            break;
        case "background":
            courseInfo = (
                <>
                    <b>{part.description}</b>
                    <p>submit to {part.backgroundMaterial}</p>
                </>
            );
            break;
        case "group":
            courseInfo = <p>project exercises {part.groupProjectCount}</p>;
            break;
        case "special":
            courseInfo = (
                <>
                    <b>{part.description}</b>
                    <p>required skills {part.requirements.join(', ')}</p>
                </>
            );
            break;
        default:
            assertNever(part);
    }

    return (
        <div>
            <h2>{part.name} {part.exerciseCount}</h2>
            {courseInfo}
        </div>
    )
}

export default Part;

interface Props {
    part: CoursePart;
}

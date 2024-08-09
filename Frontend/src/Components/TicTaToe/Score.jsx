import React, { forwardRef } from 'react';
import FirstPlayer from './FirstPlayer';
import SecondPlayer from './SecondPlayer';
import Timer from './Timer';

function Score({scores}, ref) {
    return (
        <div className="mt-4 flex w-full items-center xsm:gap-2 lg:gap-9">
            <FirstPlayer user_name="Player X" level={120} scores={scores} />
            <Timer />
            <SecondPlayer user_name="Player O" level={2} scores={scores} />
        </div>
    );
}

export default forwardRef(Score);


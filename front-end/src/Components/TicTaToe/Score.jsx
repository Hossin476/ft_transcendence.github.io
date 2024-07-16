import React, { forwardRef } from 'react';
import FirstPlayer from './FirstPlayer';
import SecondPlayer from './SecondPlayer';
import Timer from './Timer';

function Score({scores}, ref) {
    return (
        <div className="flex w-full items-center xsm:gap-2 lg:gap-9">
            <FirstPlayer user_name="Lemzabeb" level={120} scores={scores} />
            <Timer />
            <SecondPlayer user_name="L9oraydis" level={2} scores={scores} />
        </div>
    );
}

export default forwardRef(Score);


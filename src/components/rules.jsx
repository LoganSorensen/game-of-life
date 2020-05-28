import React from 'react';

const Rules = () => {
    return (
        <div className='rules'>
            <h2>Rules:</h2>
            <ul className='rules-list'>
                <li>Any living cell with fewer than two living neighbors will die, as if by underpopulation.</li>
                <li>Any living cell with either two or three living neighbors will survive to the next generation.</li>
                <li>Any living cell with three or more neighbors will die, as if by overpopulation.</li>
                <li>Any dead cell with exactly three living neighbors will become a living cell, as if by reproduction.</li>
            </ul>
        </div>
    )
}

export default Rules;
import React, { Fragment } from 'react'


const ChessBoard = () => {
    return (
        <Fragment className="ChessBoard">
            <div>
                row1
                <div>
                    col1
                </div>
                <div>
                    col2
                </div>
                <div>
                    col3
                </div>
            </div>
            <div>
                row2
                <div>
                    col1
                </div>
                <div>
                    col2
                </div>
                <div>
                    col3
                </div>
            </div>
        </Fragment>
    );
}

export default ChessBoard;
import { React, useState, useEffect } from "react";

function Slides ( { slides } ) {
    const [index, setIndex] = useState( 0 );

    const onButtonClick = ( event ) => {
        switch ( event ) {
            case 'restart': {
                setIndex( 0 );
                break;
            }
            case 'previous': {
                const prev = index - 1;
                setIndex( prev );
                break;
            }
            case 'next': {
                const next = index + 1;
                setIndex( next );
                break;
            }
            default:
                break;
        }
    }
    const isPrevButtonDisabled = index === 0;
    const isNextButtonDisabled = index === slides.length - 1;

    useEffect( () => {
        if ( index >= slides.length ) setIndex( 0 );
    }, [index, slides.length] );

    return (
        <div>
            <div id="navigation" className="text-center">
                <button data-testid="button-restart"
                    className="small outlined"
                    onClick={( e ) => onButtonClick( e.target.id )}
                    id="restart"
                    disabled={isPrevButtonDisabled}
                >
                    Restart
                </button>
                <button data-testid="button-prev"
                    className="small"
                    id="previous"
                    onClick={( e ) => onButtonClick( e.target.id )}
                    disabled={isPrevButtonDisabled}
                >
                    Prev
                </button>
                <button data-testid="button-next"
                    className="small"
                    id="next"
                    onClick={( e ) => onButtonClick( e.target.id )}
                    disabled={isNextButtonDisabled}
                >
                    Next
                </button>
            </div>
            <div id="slide" className="card text-center">
                <h1 data-testid="title">{slides[index].title}</h1>
                <p data-testid="text">{slides[index].text}</p>
            </div>
        </div>
    );
}

export default Slides;

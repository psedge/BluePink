import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Root.css"
import { playKey } from './Sound';

function Root() {
    const navigate = useNavigate();

    const pressButton = (key) => {
        const button = document.getElementById(key);
        if (!button) {
            return;
        }
        button.classList.add('pressed');
        setTimeout(() => {
            button.classList.remove('pressed');
        }, 200);

        setTimeout(() => {
            if (key === 'enter') {
                navigate('/genders');
            }
        }, 500);
    }

    const handleButtonClick = (key) => {
        playKey(key, {
            'b': ['C4'],
            'l': ['D4'],
            'u': ['E4'],
            'e': ['F4'],
            'p': ['G4'],
            'i': ['A4'],
            'n': ['B4'],
            'k': ['C5'],
            'enter': ['C3']
        });
        pressButton(key);
    }

    // bind keyboard event to the handleKeyboardEvent function
    useEffect(() => {
        const handleKeyboardEvent = (event) => {
            const key = event.key.toLowerCase();
            if (['b', 'l', 'u', 'e', 'p', 'i', 'n', 'k', 'enter'].includes(key)) {
                handleButtonClick(key);
            }
        }

        window.addEventListener('keydown', handleKeyboardEvent);
        return () => {
            window.removeEventListener('keydown', handleKeyboardEvent);
        }
    }, []);

    return (
        <div className="front-page">
            <div className="keyboard-buttons blue">
                <div className="keyboard-button blue" id="b" onClick={() => handleButtonClick('b')}>B</div>
                <div className="keyboard-button blue" id="l" onClick={() => handleButtonClick('l')}>L</div>
                <div className="keyboard-button blue" id="u" onClick={() => handleButtonClick('u')}>U</div>
                <div className="keyboard-button blue" id="e" onClick={() => handleButtonClick('e')}>E</div>
            </div>
            <div className="keyboard-buttons pink">
                <div className="keyboard-button pink" id="p" onClick={() => handleButtonClick('p')}>P</div>
                <div className="keyboard-button pink" id="i" onClick={() => handleButtonClick('i')}>I</div>
                <div className="keyboard-button pink" id="n" onClick={() => handleButtonClick('n')}>N</div>
                <div className="keyboard-button pink" id="k" onClick={() => handleButtonClick('k')}>K</div>
            </div>
            <div className="keyboard-button grey" id="enter" onClick={() => handleButtonClick('enter')}>
                <svg height="35px" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 125" x="0px" y="0px">
                    <title>{"Enter"}</title>
                    <path d="M75,49V23H67V49a4,4,0,0,1-4,4H38.66l10-10L43,37.34,26.17,54.17a4,4,0,0,0,0,5.66L43,76.66,48.66,71l-10-10H63A12,12,0,0,0,75,49Z"
                          fill="grey" style={{color: "grey"}} fillOpacity={1}/>
                </svg>
            </div>
        </div>
    );
}

export default Root;

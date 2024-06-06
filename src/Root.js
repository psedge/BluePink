import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Root.css"
import { playKey } from './Sound';

function Root() {
    const navigate = useNavigate();

    const pressButton = (key) => {
        // Find the button with the matching key and add the 'pressed' class
        const button = document.getElementById(key);
        if (button) {
            button.classList.add('pressed');
            setTimeout(() => {
                button.classList.remove('pressed');
            }, 200); // Remove the class after 200ms to simulate a key press

            setTimeout(() => {
                if (key === 'enter') {
                    navigate('/genders');
                }
            }, 500);
        }
    }

    // bind keyboard event to the handleKeyboardEvent function
    useEffect(() => {
        const handleKeyboardEvent = (event) => {
            playKey(event.key.toLowerCase(), {
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
            pressButton(event.key.toLowerCase());
        }

        window.addEventListener('keydown', handleKeyboardEvent);
        return () => {
            window.removeEventListener('keydown', handleKeyboardEvent);
        }
    }, []);

    return (
        <div className="front-page">
            <div className="keyboard-button blue" id="b">B</div>
            <div className="keyboard-button blue" id="l">L</div>
            <div className="keyboard-button blue" id="u">U</div>
            <div className="keyboard-button blue" id="e">E</div>
            <div className="keyboard-button pink" id="p">P</div>
            <div className="keyboard-button pink" id="i">I</div>
            <div className="keyboard-button pink" id="n">N</div>
            <div className="keyboard-button pink" id="k">K</div>
            <div className="keyboard-button grey" id="enter">
                <svg height="35px" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 125" x="0px" y="0px" >
                    <title>{"Enter"}</title>
                    <path  d="M75,49V23H67V49a4,4,0,0,1-4,4H38.66l10-10L43,37.34,26.17,54.17a4,4,0,0,0,0,5.66L43,76.66,48.66,71l-10-10H63A12,12,0,0,0,75,49Z"
                        fill="grey" style={{color: "grey"}} fillOpacity={1}/>
                </svg>
            </div>
        </div>
    );
}

export default Root;


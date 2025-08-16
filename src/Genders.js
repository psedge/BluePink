import React, {useEffect, useState} from 'react';
import {playCorrect, playIncorrect, playKey} from "./Sound";
import './App.css';


function Genders() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [shownIndexes, setShownIndexes] = useState([]);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [responseStartTime, setResponseStartTime] = useState(Date.now());
    const [totalResponseTime, setTotalResponseTime] = useState(0);
    const [engSvg, setEngSvg] = useState('');
    const [sweSvg, setSweSvg] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [timerStarted, setTimerStarted] = useState(false);

    useEffect(() => {
        // Fetch the data file
        fetch(process.env.PUBLIC_URL + '/final.json')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false); // Set loading to false once data is fetched
            })
            .catch(error => console.error('Error fetching data:', error));

        // Fetch the SVG file
        fetch(process.env.PUBLIC_URL + '/svg/country-4x3/gb.svg')
            .then(response => response.text())
            .then(svg => setEngSvg(svg))
            .catch(error => console.error('Error fetching SVG:', error));

        // Fetch the SVG file
        fetch(process.env.PUBLIC_URL + '/svg/country-4x3/se.svg')
            .then(response => response.text())
            .then(svg => setSweSvg(svg))
            .catch(error => console.error('Error fetching SVG:', error));
    }, []);

    const moveToNext = () => {
        let randomIndex = getRandomOption();
        setShownIndexes([...shownIndexes, randomIndex]);
        setSelectedOption(null);
        setIsCorrect(null);
        setCurrentIndex(randomIndex);
        setTimerStarted(false);
        setResponseStartTime(Date.now());
    };

    const getRandomOption = () => {
        // set random index not in the set that has been already shown
        let randomIndex = Math.floor(Math.random() * data.length);
        while (shownIndexes.includes(randomIndex)) {
            randomIndex = Math.floor(Math.random() * data.length);
        }
        return randomIndex;
    }

    const handleOptionClick = (option) => {
        if (!timerStarted) {
            const currentResponseTime = Math.abs(responseStartTime - Date.now());
            setTotalResponseTime(totalResponseTime + currentResponseTime);

            setSelectedOption(option);
            if (option === data[currentIndex].form) {
                playCorrect();
                setIsCorrect(true);
                setCorrect(correct + 1);
            } else {
                playIncorrect();
                setIsCorrect(false);
                setIncorrect(incorrect - 1);
            }
            setTimerStarted(true);
        }
    }

    useEffect(() => {
        const handleKeyboardEvent = (event) => {
            switch (event.key.toLowerCase()) {
                case 'n':
                    if (!timerStarted) handleOptionClick('en');
                    break;
                case 't':
                    if (!timerStarted) handleOptionClick('ett');
                    break;
                case ' ':
                    event.preventDefault();
                    if (timerStarted) moveToNext();
                    break;
            }
        }

        window.addEventListener('keydown', handleKeyboardEvent);
        return () => {window.removeEventListener('keydown', handleKeyboardEvent);}
    });

    const removeWordFromExample = (item) => {
        const indefiniteForm = item.indefinite.toLowerCase();
        const definiteForm = item.definite.toLowerCase();
        const articleForm = item.form.toLowerCase();

        const replaceWord = (example, word, length) => {
            const preceding = [articleForm, "min", "din", "sin", "mitt", "ditt", "sitt"];
            // Gender-revealing words that should be hidden with the target word
            const genderRevealing = articleForm === "en" ? ["den"] : ["det"];
            
            let workingExample = example;
            for (let i = 0; i < preceding.length; i++) {
                const regex = new RegExp(`(^|\\s)(${preceding[i]}\\s+)?(${word})(\\s|$)`, "gi");
                workingExample = workingExample.replace(regex, (match, start, prefix, word, end) => {
                    return start + (prefix || "") + "_".repeat(length) + end;
                });
            }
            
            // Also hide gender-revealing definite articles
            for (let revealing of genderRevealing) {
                const revealingRegex = new RegExp(`(^|\\s)(${revealing}\\s+)(${word})(\\s|$)`, "gi");
                workingExample = workingExample.replace(revealingRegex, (match, start, article, word, end) => {
                    return start + "_".repeat(article.length + word.length - 1) + end;
                });
            }
            
            return workingExample
        };

        let updatedEgSwe = item.eg_swe.toLowerCase();
        updatedEgSwe = replaceWord(updatedEgSwe, indefiniteForm, indefiniteForm.length + (articleForm.length + 1));
        updatedEgSwe = replaceWord(updatedEgSwe, definiteForm, definiteForm.length);

        return updatedEgSwe.charAt(0).toUpperCase() + updatedEgSwe.slice(1);
    };

    const getPoints = () => {
        return correct + incorrect;
    }

    const getPercentage = () => {
        if (shownIndexes.length === 0) {
            return 0;
        }
        return Math.round((correct / shownIndexes.length) * 100);
    }

    const getAverageResponseTime = () => {
        if (correct === 0) {
            return "∞";
        }

        // If the response time is less than 10 seconds, show it in milliseconds, otherwise show it as a 1dp number in seconds
        let milliseconds = Math.round(totalResponseTime / shownIndexes.length)
        return milliseconds < 1000 ? milliseconds + "ms" : (milliseconds / 1000).toFixed(1) + "s";
    }

    if (isLoading) {
        return <div>Loading...</div>; // Render a loading indicator while data is being fetched
    }

    return (
        <div className="App">
            <div className={`counter ${timerStarted === true ? isCorrect === true ? 'added' : 'removed' : ''}`}>
                <span class="points">{getPoints()}</span>
                <span class="percentage"> ({getPercentage()}% of {shownIndexes.length})</span>
                <span class="average"> at {getAverageResponseTime()} per</span>
            </div>
            <div className="split-container">
                <div className="splits">
                    {currentIndex < data.length ? (
                        <div className="container">
                            <div className={`box a ${timerStarted === true ? isCorrect === true ? 'correct' : 'incorrect' : ''}`} onClick={() => handleOptionClick('en')}>
                                <span className="choice">En {data[currentIndex].swe}</span>
                                <div className="icon">
                                    <div className={`keyboard-button ${timerStarted === true ? selectedOption === 'en' ? 'pressed' : '' : ''}`} id="button">N</div>
                                </div>
                            </div>
                            <div className={`box b ${timerStarted === true ? isCorrect === true ? 'correct' : 'incorrect' : ''}`} onClick={() => handleOptionClick('ett')} >
                                <span className="choice">Ett {data[currentIndex].swe}</span>
                                <div className="icon">
                                    <div className={`keyboard-button ${timerStarted === true ? selectedOption === 'ett' ? 'pressed' : '' : ''}`} id="button">T</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="result">End of data</div>
                    )}
                </div>
                <div className="full-width-bar">
                    <div className="example">
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(engSvg)}`} alt="GB Flag" width="20" height="15" />
                        <span>{data[currentIndex].eg_eng}</span>
                        <br />
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(sweSvg)}`} alt="SE Flag" width="20" height="15" />
                        <span>{ timerStarted ? data[currentIndex].eg_swe : removeWordFromExample(data[currentIndex])}</span>
                        {timerStarted && (
                            <div className="next-prompt">
                                <br />
                                <span style={{fontSize: '14px', color: '#666'}}>Press Space for next →</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Genders;
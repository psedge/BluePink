import * as Tone from "tone";

export function playKey(key, notes) {
    const synth = new Tone.Synth().toDestination();

    const validKeys = ['b', 'l', 'u', 'e', 'p', 'i', 'n', 'k', 'enter', 'a'];
    if (validKeys.includes(key)) {
        for (let note in notes[key]) {
            console.log(notes[key][note])
            synth.triggerAttackRelease(notes[key][note], "4n");
        }
    }
}

export function playCorrect() {
    const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();

    const chords = [
        ['C4', 'E4', 'G4'],   // C major chord
        ['D4', 'F#4', 'A4'],  // D major chord
        ['E4', 'G#4', 'B4'],  // E major chord
        ['F4', 'A4', 'C5'],   // F major chord
        ['G4', 'B4', 'D5'],   // G major chord
        ['A4', 'C#5', 'E5'],  // A major chord
        ['B4', 'D#5', 'F#5'], // B major chord
    ];

    const randomIndex = Math.floor(Math.random() * chords.length);
    const randomChord = chords[randomIndex];

    polySynth.triggerAttackRelease(randomChord, "4n");
}

export function playIncorrect() {
    const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();

    const rootNote = "C3";
    const notes = [rootNote, rootNote + " Eb", rootNote + " Gb", rootNote + " A"];

    polySynth.triggerAttackRelease(notes, "4n");
}

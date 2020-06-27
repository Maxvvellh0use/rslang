export const TEXT = {
    HEADING: 'Settings',
    ENGLISH_LEVEL: 'Choose your English level:',
    DAILY_NUMBER: 'Enter the daily number of words you want to learn:',
    MAX_NUMBER: 'Enter the maximum number of words you want to learn daily:',
    SUBMIT: 'Submit',
    TIPS: 'Choose what will be displayed on cards:',
}
export const NOTIFICATIONS = {
    NUMBER_OF_WORDS: { type: 'error', text: 'Maximum number of words cannot be more than daily number of words' },
    CHECKBOX: { type: 'error', text: 'At least one hint must be selected' },
    SUCCESS: { type: 'success', text: 'Settings changed successfully' },
}
export const ENGLISH_LEVELS_ARRAY = ['Beginner', 'Intermediate', 'Advanced'];
export const TIPS_ARRAY = [
    { type: 'checkbox', name: 'translation', text: 'translation of a word' },
    { type: 'checkbox', name: 'meaningSentense', text: 'sentence with the meaning of the word' },
    { type: 'checkbox', name: 'exampleSentense', text: 'sentense using this word' },
    { type: 'checkbox', name: 'autoPlay', text: 'auto play word pronunciation' }
];
export default class SoundModule {
    static async playAudio(audioSrc, audioPlaySection) {
        const audio = new Audio(audioSrc);
        audio.addEventListener('ended', () => {
            audioPlaySection.classList.remove('audio_in_progress')
        });
        if (!audioPlaySection.classList.contains('audio_in_progress')) {
            await audio.play();
            audioPlaySection.classList.add('audio_in_progress');
        }
    }
}

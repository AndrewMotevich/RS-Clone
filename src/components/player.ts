import Controller from './controller';
import { episode, OnClickPlayerButton, OnRangeInput } from './types/type';
import { querySelectNonNull, requiresNonNull } from './utils';

export class Player {
    private readonly onRangeInput: OnRangeInput;
    private readonly onClickPlayerButton: OnClickPlayerButton;
    public readonly audio: HTMLAudioElement;
    public isPlay: boolean = false;
    private controller: Controller = new Controller();

    constructor(onRangeInput: OnRangeInput, onClickPlayerButton: OnClickPlayerButton) {
        this.audio = document.createElement('audio');
        this.audio.classList.add('track');
        this.setFirstAudio();
        this.onRangeInput = onRangeInput;
        this.onClickPlayerButton = onClickPlayerButton;
        this.controller = new Controller();
    }

    public draw(): void {
        const player: Element = document.createElement('div');
        player.classList.add('player');

        this.audio.addEventListener('timeupdate', () => {
            this.updateCurrentTime(this.audio.currentTime);
        });

        player.appendChild(this.audio);
        player.appendChild(this.createEpisodeData());
        player.appendChild(this.createPlayerWrapper());
        player.appendChild(this.createProgressVolume());

        const header: Element = querySelectNonNull<Element>('.header__container');
        header.appendChild(player);
    }

    private createEpisodeData(): Element {
        const episodeData: Element = document.createElement('div');
        episodeData.classList.add('player__podcast-data');

        const episodeImage: HTMLImageElement = document.createElement('img');
        episodeImage.classList.add('player__image');

        const saveButton: Element = document.createElement('div');
        saveButton.classList.add('player__button');
        saveButton.classList.add('save');
        saveButton.addEventListener('click', (event: Event) => this.onClickPlayerButton(event));

        episodeData.appendChild(episodeImage);
        episodeData.appendChild(this.createPlayerInfo());
        episodeData.appendChild(saveButton);

        return episodeData;
    }

    private createPlayerInfo(): Element {
        const episodeInfo: Element = document.createElement('div');
        episodeInfo.classList.add('player__info');
        const episodeTitle: Element = document.createElement('div');
        episodeTitle.classList.add('player__title');

        const episodeOwner: Element = document.createElement('div');
        episodeOwner.classList.add('player__owner');

        episodeInfo.appendChild(episodeTitle);
        episodeInfo.appendChild(episodeOwner);

        return episodeInfo;
    }

    private createPlayerWrapper(): Element {
        const wrapper: Element = document.createElement('div');
        wrapper.classList.add('player__wrapper');

        wrapper.appendChild(this.createPlayerButtons());
        wrapper.appendChild(this.createProgressTrack());
        return wrapper;
    }

    private createPlayerButtons(): Element {
        const wrapper: Element = document.createElement('div');
        wrapper.classList.add('buttons__wrapper');

        const skipBack: Element = document.createElement('p');
        skipBack.id = 'skip-back';
        skipBack.classList.add('player__button');
        skipBack.classList.add('skip-back');
        skipBack.addEventListener('click', (event) => this.onClickPlayerButton(event));

        const previousButton: Element = document.createElement('p');
        previousButton.id = 'previous';
        previousButton.classList.add('player__button');
        previousButton.classList.add('previous');
        previousButton.addEventListener('click', (event) => this.onClickPlayerButton(event));

        const playButton: Element = document.createElement('p');
        playButton.id = 'play';
        playButton.classList.add('player__button');
        playButton.classList.add('play');
        playButton.addEventListener('click', (event) => this.onClickPlayerButton(event));

        const nextButton: Element = document.createElement('p');
        nextButton.id = 'next';
        nextButton.classList.add('player__button');
        nextButton.classList.add('next');
        nextButton.addEventListener('click', (event) => this.onClickPlayerButton(event));

        const skipForward: Element = document.createElement('p');
        skipForward.id = 'skip-forward';
        skipForward.classList.add('player__button');
        skipForward.classList.add('skip-forward');
        skipForward.addEventListener('click', (event) => this.onClickPlayerButton(event));

        wrapper.appendChild(skipBack);
        wrapper.appendChild(previousButton);
        wrapper.appendChild(playButton);
        wrapper.appendChild(nextButton);
        wrapper.appendChild(skipForward);

        return wrapper;
    }

    private createProgressTrack(): Element {
        const wrapper: Element = document.createElement('div');
        wrapper.classList.add('progress__wrapper');

        const currentTime: Element = document.createElement('p');
        currentTime.classList.add('time');
        currentTime.classList.add('time_current');
        currentTime.textContent = '0:00';

        const progressTrack: HTMLInputElement = document.createElement('input');
        progressTrack.classList.add('progress');
        progressTrack.classList.add('progress_track');
        progressTrack.type = 'range';
        progressTrack.min = '0';
        progressTrack.max = '0';
        progressTrack.value = '0';
        progressTrack.step = '1';
        progressTrack.addEventListener('input', (event: Event) => {
            const target: HTMLInputElement = event.target as HTMLInputElement;
            const value: string = target.value;
            this.audio.currentTime = Number(value);
            this.updateCurrentTime(Number(value));
            this.onRangeInput(event);
        });

        const durationTime: Element = document.createElement('p');
        durationTime.classList.add('time');
        durationTime.classList.add('time_duration');
        durationTime.textContent = '0:00';

        wrapper.appendChild(currentTime);
        wrapper.appendChild(progressTrack);
        wrapper.appendChild(durationTime);

        return wrapper;
    }

    private updateProgressTrackDuration(duration: number): void {
        const progressTrack: HTMLInputElement = querySelectNonNull<HTMLInputElement>('.progress_track');
        progressTrack.max = String(duration);
        progressTrack.step = '1';
        const durationTime: Element = querySelectNonNull<Element>('.time_duration');
        durationTime.textContent = this.formatTime(duration);
    }

    private updateCurrentTime(value: number): void {
        const currentTime: Element = querySelectNonNull<Element>('.time_current');
        currentTime.textContent = this.formatTime(value);
        const progressBarTrack: HTMLInputElement = querySelectNonNull<HTMLInputElement>('.progress_track');
        progressBarTrack.value = String(value);
    }

    private createProgressVolume(): Element {
        const wrapper: Element = document.createElement('div');
        wrapper.classList.add('player-volume__wrapper');

        const progressVolume: HTMLInputElement = document.createElement('input');
        progressVolume.classList.add('progress');
        progressVolume.classList.add('progress_volume');
        progressVolume.type = 'range';
        progressVolume.step = '0.1';
        progressVolume.min = '0';
        progressVolume.max = '1';
        progressVolume.value = '0.2';
        progressVolume.style.background = `linear-gradient(to right, #993aed 0%, #993aed ${
            Number(progressVolume.value) * 100
        }%, #dddddd ${Number(progressVolume.value) * 100}%, #dddddd 100%)`;
        this.audio.volume = Number(progressVolume.value);

        progressVolume.addEventListener('input', (event) => {
            this.onRangeInput(event);
            this.audio.volume = Number(progressVolume.value);
        });
        wrapper.appendChild(progressVolume);

        return wrapper;
    }

    public playAudio(): void {
        const playButton: Element = querySelectNonNull<Element>('#play');
        this.audio.play();
        if (!this.isPlay) {
            this.isPlay = true;
            playButton.classList.toggle('pause');
        }
    }

    public pauseAudio(): void {
        const playButton: Element = querySelectNonNull<Element>('#play');
        this.audio.pause();
        if (this.isPlay) {
            this.isPlay = false;
            playButton.classList.toggle('pause');
            const episodePlayButton: Element = requiresNonNull(document.querySelector('.pause'));
            episodePlayButton.classList.toggle('pause');
        }
    }

    private formatTime(duration: number) {
        const minutes: number = Math.floor(duration / 60);
        const seconds: number = Math.floor(duration % 60);

        return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
    }

    public skipBack(): void {
        const currentValue: number = this.audio.currentTime - 10;
        this.audio.currentTime = currentValue;
        this.updateCurrentTime(currentValue);
    }

    public skipForward(): void {
        const currentValue: number = this.audio.currentTime + 10;
        this.audio.currentTime = currentValue;
        this.updateCurrentTime(currentValue);
    }

    public nextEpisode(): void {
        console.log('next'); //will be deleted later
        this.playAudio();
    }

    public previousEpisode(): void {
        console.log('prev'); //will be deleted later
        this.playAudio();
    }

    private setFirstAudio(): void {
        this.controller.fetchDataForUpdatePlayer().then((data) => {
            this.updateData(data);
            this.updateProgressTrackDuration(data.duration);
            this.audio.setAttribute('data-id', `${data.id}`);
        });
    }

    public updatePlayerSource(episodeId: number, event: Event): void {
        this.controller.fetchEpisodeById(episodeId).then((data) => {
            const target: Element = event.target as Element;
            if (episodeId !== Number(this.audio.getAttribute('data-id'))) {
                this.updateData(data);
                this.updateProgressTrackDuration(data.duration);
            }
            if (target.classList.value.includes('card__play')) {
                this.playAudio();
                return;
            }
            if (!target.classList.value.includes('pause')) {
                target.classList.toggle('pause');
                this.playAudio();
                return;
            }
            target.classList.toggle('pause');
            this.pauseAudio();
        });
    }

    private updateData(data: episode) {
        this.audio.src = data.enclosureUrl;
        this.audio.setAttribute('data-id', `${data.id}`);
        const episodeTitle: Element = querySelectNonNull<Element>('.player__title');
        episodeTitle.textContent = data.title;
        const episodeImage: HTMLImageElement = querySelectNonNull<HTMLImageElement>('.player__image');

        episodeImage.src = data.image || data.feedImage || './assets/img/fav-icon.png';
        episodeImage.alt = data.title;
    }
}

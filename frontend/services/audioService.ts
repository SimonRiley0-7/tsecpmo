import { Speaker } from '../types';

export interface WordTimestamp {
    word: string;
    start_time: number;
    end_time: number;
}

export interface AudioGenerationResult {
    audioUrl: string;
    timestamps: WordTimestamp[];
}

// Voice mapping for Kokoro TTS
const VOICE_MAP: Record<Speaker, string> = {
    [Speaker.JUDGE]: 'am_santa',
    [Speaker.SUPPORT]: 'am_michael',
    [Speaker.OPPOSE]: 'am_adam',
    [Speaker.NONE]: 'am_santa',
    [Speaker.SYSTEM]: 'am_santa',
};

const KOKORO_API_URL = process.env.TTS_API_URL || 'http://localhost:8880/dev/captioned_speech';

/**
 * Generate speech audio for a given text and speaker.
 * Returns an object URL for the audio blob and word-level timestamps.
 */
export async function generateSpeechForTurn(
    text: string,
    speaker: Speaker
): Promise<AudioGenerationResult> {
    const voice = VOICE_MAP[speaker] || 'am_santa';

    const response = await fetch(KOKORO_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'kokoro',
            input: text,
            voice: voice,
            speed: 1.0,
            response_format: 'mp3',
            stream: false,
        }),
    });

    if (!response.ok) {
        throw new Error(`Kokoro API error: ${response.status} ${response.statusText}`);
    }

    const audioJson = await response.json();

    // Decode base64 audio to blob
    const audioBytes = atob(audioJson.audio);
    const audioArray = new Uint8Array(audioBytes.length);
    for (let i = 0; i < audioBytes.length; i++) {
        audioArray[i] = audioBytes.charCodeAt(i);
    }
    const audioBlob = new Blob([audioArray], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);

    return {
        audioUrl,
        timestamps: audioJson.timestamps as WordTimestamp[],
    };
}

/**
 * Pre-process audio for multiple turns in the background.
 * Returns a Map of turn index to audio data.
 */
export async function processAudioQueue(
    turns: { text: string; speaker: Speaker }[],
    startIndex: number = 0,
    onTurnReady?: (index: number, result: AudioGenerationResult) => void
): Promise<Map<number, AudioGenerationResult>> {
    const results = new Map<number, AudioGenerationResult>();

    for (let i = startIndex; i < turns.length; i++) {
        try {
            const result = await generateSpeechForTurn(turns[i].text, turns[i].speaker);
            results.set(i, result);
            if (onTurnReady) {
                onTurnReady(i, result);
            }
        } catch (error) {
            console.error(`Failed to generate audio for turn ${i}:`, error);
            // Continue processing other turns even if one fails
        }
    }

    return results;
}

/**
 * Cleanup object URLs when no longer needed.
 */
export function revokeAudioUrl(url: string): void {
    URL.revokeObjectURL(url);
}

// This file has been deprecated and is ready to be deleted.
export let vrmInstance: any = null;
export let isSpeaking: boolean = false;
export let currentEmotion: string = "neutral";

export function setVRM(vrm: any) {}
export function setSpeaking(state: boolean) {}
export function setEmotion(emotion: string) {}
export function speakText(text: string, emotion: string = "neutral") {}
export function triggerExpression(name: string) {}
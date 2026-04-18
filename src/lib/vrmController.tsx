export let vrmInstance: any = null;
export let isSpeaking: boolean = false;
export let currentEmotion: string = "neutral";

export function setVRM(vrm: any) {
  vrmInstance = vrm;
}

export function setSpeaking(state: boolean) {
  isSpeaking = state;
}

export function setEmotion(emotion: string) {
  currentEmotion = emotion;
}

export function speakText(text: string, emotion: string = "neutral") {
  if (typeof window === 'undefined' || !("speechSynthesis" in window)) return;

  // Stop any ongoing speech
  window.speechSynthesis.cancel();

  setEmotion(emotion);
  
  // Clean text: Remove emojis, asterisks (actions), and newlines that cause Japanese TTS to hiccup or break
  const cleanText = text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/\*/g, '')
    .replace(/\n /g, '、')
    .replace(/\n/g, '、');

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = "ja-JP"; // Set to Japanese
  utterance.rate = 1.0; // Natural speed, no anime rush
  utterance.pitch = 1.0; // Natural pitch
  utterance.volume = 1.0;

  // Select Japanese voice
  const voices = window.speechSynthesis.getVoices();
  const jpVoices = voices.filter(v => v.lang.includes("ja"));
  if (jpVoices.length > 0) {
    // Basic heuristic for female voice if present (Microsoft Haruka, Google 日本語, etc)
    const femaleVoice = jpVoices.find(v => v.name.toLowerCase().includes("haruka") || v.name.toLowerCase().includes("female"));
    utterance.voice = femaleVoice || jpVoices[0];
  }

  utterance.onstart = () => {
    setSpeaking(true);
  };

  utterance.onend = () => {
    setSpeaking(false);
    setEmotion("neutral");
  };

  utterance.onerror = () => {
    setSpeaking(false);
    setEmotion("neutral");
  };

  window.speechSynthesis.speak(utterance);
}

export function triggerExpression(name: string) {
  if (!vrmInstance) return;

  vrmInstance.expressionManager?.setValue(name, 1);

  setTimeout(() => {
    vrmInstance.expressionManager?.setValue(name, 0);
  }, 1500);
}
import { useRef, useState, useEffect } from "react";

export type InputProp = {
  message: string;
  setMessage: (msg: string) => void;
  sendMessage: (msg: string) => void;
};

const useInput = ({ message, setMessage, sendMessage }: InputProp) => {
  const [inputMessage, setInputMessage] = useState(message);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [transcribing, setTranscribing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keep external state in sync
  useEffect(() => {
    setInputMessage(message);
  }, [message]);

  // ==========================
  // 📤 Send message
  // ==========================
  const handleSend = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ==========================
  // 🎙️ Voice Recording
  // ==========================
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        await transcribeAudio(blob);
        stream.getTracks().forEach((track) => track.stop()); // cleanup mic
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      drawWaveform(stream);
    } catch (err) {
      console.error("Mic error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    setIsRecording(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  // ==========================
  // 📊 Waveform Drawing
  // ==========================
  const drawWaveform = (stream: MediaStream) => {
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "#1f0932";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#9f7aea";
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();
  };

  // ==========================
  // 🧠 Transcription API
  // ==========================
  const transcribeAudio = async (audioBlob: Blob) => {
    setTranscribing(true);
    try {
      const formData = new FormData();
      formData.append("file", audioBlob);

      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.text) {
        setInputMessage(data.text);
      }
    } catch (err) {
      console.error("Transcription failed:", err);
    } finally {
      setTranscribing(false);
    }
  };

  // ==========================
  // 📎 File Upload
  // ==========================
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setInputMessage((prev) => prev + ` [File Attached: ${file.name}]`);
    }
  };

  const handlePaperclipClick = () => {
    fileInputRef.current?.click();
  };

  return {
    isRecording,
    inputMessage,
    setInputMessage,
    handleSend,
    handleKeyDown,
    startRecording,
    stopRecording,
    transcribing,
    fileInputRef,
    handleFileUpload,
    handlePaperclipClick,
    canvasRef,
  };
};

export default useInput;

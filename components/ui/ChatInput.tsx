"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Mic, StopCircle } from "lucide-react";

interface ChatInputProps {
  message: string;
  setMessage: (val: string) => void;
  sendMessage: (msg: string) => void;
  className?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  sendMessage,
  className = "",
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [transcribing, setTranscribing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
const animationRef = useRef<number | null>(null);


  // 🎙️ Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        setAudioChunks(chunks);
        transcribeAudio(new Blob(chunks, { type: "audio/webm" }));
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      drawWaveform(stream);
    } catch (err) {
      console.error("Mic error:", err);
    }
  };

  // 🛑 Stop Recording
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
    cancelAnimationFrame(animationRef.current!);
  };

  // 📊 Live Waveform
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
      ctx.strokeStyle = "#9f7aea"; // Purple accent
      ctx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
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

  // 🧠 Fake transcription (replace with API if needed)
  const transcribeAudio = async (audioBlob: Blob) => {
    setTranscribing(true);
    // TODO: Send `audioBlob` to an API like Whisper/OpenAI/Gemini
    setTimeout(() => {
      setMessage("Hello, this is a test transcription.");
      setTranscribing(false);
    }, 1500);
  };

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div
      className={`flex items-center gap-2 p-3 bg-[#2a0a44] border-t border-white/10 ${className}`}
    >
      {/* Input */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder={transcribing ? "Transcribing..." : "Type your message..."}
        className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none text-sm"
      />

      {/* Mic Button + Waveform */}
      <div className="flex items-center gap-2">
        {isRecording ? (
          <>
            <canvas ref={canvasRef} width={60} height={24} className="rounded bg-black/30" />
            <button onClick={stopRecording} className="p-2 rounded-full bg-red-600">
              <StopCircle size={18} className="text-white" />
            </button>
          </>
        ) : (
          <button onClick={startRecording} className="p-2 rounded-full bg-purple-600">
            <Mic size={18} className="text-white" />
          </button>
        )}

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="p-2 rounded-full bg-purple-700 hover:bg-purple-800"
        >
          <Send size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;

import { useState } from "react";

export const useListDraw = () => {
  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState("");
  const [error, setError] = useState("");
  const [countdownOpen, setCountdownOpen] = useState(false);
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);
  const [winner, setWinner] = useState("");
  const [numberOfWinners, setNumberOfWinners] = useState(1);
  const [countdownDuration, setCountdownDuration] = useState(3);

  // Contar participantes
  const participantCount = participants
    .split("\n")
    .filter((line) => line.trim() !== "").length;

  // Obtener array de participantes
  const getParticipantsArray = (): string[] => {
    return participants
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");
  };

  // Manejar importación de archivo
  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setParticipants(content);
    };
    reader.readAsText(file);
  };

  // Validar y comenzar sorteo
  const handleStartDraw = () => {
    if (!title.trim()) {
      setError("Por favor ingresa un título para el sorteo");
      return;
    }

    if (participantCount < 2) {
      setError("Debes tener al menos 2 participantes");
      return;
    }

    if (numberOfWinners > participantCount) {
      setError(`No puedes seleccionar más ganadores (${numberOfWinners}) que participantes (${participantCount})`);
      return;
    }

    setError("");
    
    // Seleccionar ganadores aleatorios sin repetición
    const participantsArray = getParticipantsArray();
    const shuffled = [...participantsArray].sort(() => Math.random() - 0.5);
    const selectedWinners = shuffled.slice(0, numberOfWinners);
    setWinner(selectedWinners.join(", "));
    
    // Abrir countdown
    setCountdownOpen(true);
  };

  // Completar countdown y mostrar ganador
  const handleCountdownComplete = () => {
    setCountdownOpen(false);
    setWinnerModalOpen(true);
  };

  // Cerrar modal de ganador
  const handleCloseWinnerModal = () => {
    setWinnerModalOpen(false);
  };

  // Nuevo sorteo
  const handleNewDraw = () => {
    setWinnerModalOpen(false);
    
    // Seleccionar nuevos ganadores
    const participantsArray = getParticipantsArray();
    const shuffled = [...participantsArray].sort(() => Math.random() - 0.5);
    const selectedWinners = shuffled.slice(0, numberOfWinners);
    setWinner(selectedWinners.join(", "));
    
    setCountdownOpen(true);
  };

  // Resetear todo
  const handleReset = () => {
    setTitle("");
    setParticipants("");
    setError("");
    setCountdownOpen(false);
    setWinnerModalOpen(false);
    setWinner("");
  };

  return {
    title,
    setTitle,
    participants,
    setParticipants,
    error,
    participantCount,
    countdownOpen,
    winnerModalOpen,
    winner,
    numberOfWinners,
    setNumberOfWinners,
    countdownDuration,
    setCountdownDuration,
    getParticipantsArray,
    handleImportFile,
    handleStartDraw,
    handleCountdownComplete,
    handleCloseWinnerModal,
    handleNewDraw,
    handleReset,
  };
};

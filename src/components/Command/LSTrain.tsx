import { useEffect, useState } from "react";
import trainAscii from "../../assets/train.txt";


export default function SLTrain({ onComplete }: { onComplete: () => void }) {
  const [train, setTrain] = useState<string>("");
  const [position, setPosition] = useState<number>(200);

  useEffect(() => {
    fetch(trainAscii)
      .then((res) => res.text())
      .then((data) => setTrain(data))
      .catch((err) => console.error("Error loading train art:", err));
    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
        <pre style={{ whiteSpace: "pre", transform: "translateX(-65rem)" }}>
          {train
            .split("\n")
            .map((line) => " ".repeat(position) + line)
            .join("\n")}
        </pre>
  );
}
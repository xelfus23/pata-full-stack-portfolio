import { ButtonProps } from "@/types/interface";
import { useCursorState } from "@/utils/cursorProvider";

const PrimaryButton: React.FC<ButtonProps> = ({
    label,
    disabled,
    onClick,
    error,
    children,
    success,
    full,
    color = "primary",
}) => {
    const { setCursorState } = useCursorState();

    const style = error
        ? `bg-red-400 hover:bg-red-400/80 px-6 py-3 rounded-md text-background hover:cursor-pointer transition-colors ${
              full ? "w-full" : ""
          }`
        : success
        ? `bg-green-400 hover:bg-green-400/80 px-6 py-3 rounded-md text-background hover:cursor-pointer transition-colors ${
              full ? "w-full" : ""
          }`
        : `bg-${color} hover:bg-${color}/80 px-6 py-3 rounded-md text-background hover:cursor-pointer transition-colors ${
              full ? "w-full" : ""
          }`;

    return (
        <button
            disabled={disabled}
            onMouseEnter={() => setCursorState({ scale: 1.2 })}
            onMouseLeave={() => setCursorState({ scale: 0.5 })}
            className={style}
            onClick={onClick}
        >
            {label}
            {children}
        </button>
    );
};

export default PrimaryButton;

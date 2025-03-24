import { ButtonProps } from "@/types/interface";
import { useCursorState } from "@/utils/cursorProvider";

const SecondaryButton: React.FC<ButtonProps> = ({
    label,
    disabled,
    onClick,
    type,
    color = "primary",
}) => {
    const { setCursorState } = useCursorState();
    return (
        <button
            disabled={disabled}
            onMouseEnter={() => setCursorState({ scale: 1 })}
            onMouseLeave={() => setCursorState({ scale: 0.5 })}
            className={`border border-${color} hover:bg-${color}/10 px-6 py-3 rounded-md text-${color} hover:cursor-pointer`}
            onClick={onClick}
            type={type}
        >
            {label}
        </button>
    );
};

export default SecondaryButton;

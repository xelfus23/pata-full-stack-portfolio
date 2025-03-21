import { ButtonProps } from "@/types/interface";
import { useCursorState } from "@/utils/cursorProvider";

const SecondaryButton: React.FC<ButtonProps> = ({
    label,
    disabled,
    onClick,
    type,
}) => {
    const { setCursorState } = useCursorState();
    return (
        <button
            disabled={disabled}
            onMouseEnter={() => setCursorState({ scale: 1 })}
            onMouseLeave={() => setCursorState({ scale: 0.5 })}
            className="border border-primary hover:bg-primary/10 px-6 py-3 rounded-md text-primary hover:cursor-pointer"
            onClick={onClick}
            type={type}
        >
            {label}
        </button>
    );
};

export default SecondaryButton;

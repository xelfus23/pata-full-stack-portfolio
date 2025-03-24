import { InputProps } from "@/types/interface";

const Input: React.FC<InputProps> = ({
    id,
    type,
    placeholder,
    value,
    onChange,
    required,
    error,
    spellCheck,
}) => {
    const style = error
        ? `w-full p-3 bg-red-400/5 border outline-none border-red-400/20 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent text-text resize-none`
        : `w-full p-3 bg-secondary/5 outline-none border border-secondary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-text resize-none
    `;

    return (
        <div>
            <input
                type={type}
                id={id}
                className={style}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(id, e.target.value)} // Pass id and value
                required={required}
                spellCheck={spellCheck}
            />
        </div>
    );
};

export default Input;

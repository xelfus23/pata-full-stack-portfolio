'use client';
import { createContext, useContext, useState, ReactNode } from "react";

interface CursorStateType {
    scale: number;
}

interface cursorContextType {
    cursorState: CursorStateType;
    setCursorState: (newState: Partial<CursorStateType>) => void;
}

const CursorContext = createContext<cursorContextType>({
    cursorState: {
        scale: 0.5,
    },
    setCursorState: () => {},
});

interface CursorProviderProps {
    children: ReactNode;
}

function CursorProvider({ children }: CursorProviderProps) {
    const [cursorState, setCursorState] = useState<CursorStateType>({
        scale: 0.5,
    });

    const updateCursorState = (newState: Partial<CursorStateType>) => {
        setCursorState((prevState) => ({ ...prevState, ...newState }));
    };

    return (
        <CursorContext.Provider
            value={{ cursorState, setCursorState: updateCursorState }}
        >
            {children}
        </CursorContext.Provider>
    );
}

function useCursorState(): cursorContextType {
    return useContext(CursorContext);
}

export { CursorProvider, useCursorState };

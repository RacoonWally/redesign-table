import React, { useState } from 'react';

interface Data {
    isOpen: boolean;
    onToggleOpen: (event?: React.MouseEvent<HTMLDivElement>) => void;
}

export function useCellButton(): Data {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function onToggleOpen(event?: React.MouseEvent<HTMLDivElement>): void {
        event?.stopPropagation();

        setIsOpen(!isOpen);
    }

    return {
        isOpen,
        onToggleOpen,
    };
}

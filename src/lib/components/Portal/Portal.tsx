import React from 'react';
import { createPortal } from 'react-dom';

const createPortalRootNode = (portalName: string): HTMLElement => {
    // let portalRoot = document.getElementById('modal-root');
    let portalRoot = document.getElementsByTagName(portalName)[0];
    if (!portalRoot) {
        const node = document.createElement(portalName);
        document.body.appendChild(node);
        portalRoot = document.getElementsByTagName(portalName)[0];
    }
    return portalRoot as HTMLElement;
};

export interface IPortalProps {
    children: React.ReactNode;
    portalName?: string;
}

export function Portal({ children, portalName = 'elements-portal' }: IPortalProps) {
    const portalNode = createPortalRootNode(portalName);
    return createPortal(children, portalNode);
}

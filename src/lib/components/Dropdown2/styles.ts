import { CSSProperties } from 'react';

export class DropdownSpringStyles {
    private showOnTop: boolean;
    private showOnBottom: boolean;
    private showOnCenter: boolean;

    constructor(
        private dropdownRef: React.MutableRefObject<HTMLDivElement>,
        private parentBound: ClientRect
    ) {
        const { bottomSpace, dropdownHeight, topSpace } = this.getSpaces();
        this.showOnTop = bottomSpace < dropdownHeight;
        this.showOnBottom = bottomSpace > dropdownHeight;
        this.showOnCenter = bottomSpace < dropdownHeight && topSpace < dropdownHeight;
    }

    private createBaseStyles() {
        return {
            opacity: 1,
            transform: 'translateY(0)',
            left: this.parentBound.left,
            minWidth: this.parentBound.width,
            width: this.parentBound.width,
        };
    }

    private getSpaces() {
        const dropdownHeight = this.dropdownRef?.current?.clientHeight;
        const windowHeight = window.innerHeight;
        const bottomSpace = windowHeight - this.parentBound?.bottom;
        const topSpace = this.parentBound?.top;
        return {
            dropdownHeight,
            windowHeight,
            bottomSpace,
            topSpace,
        };
    }

    private createStyleOnBottom(): CSSProperties {
        const baseStyle = this.createBaseStyles();
        return {
            ...baseStyle,
            top: this.parentBound.bottom,
        };
    }

    private createStyleOnTop(): CSSProperties {
        const baseStyle = this.createBaseStyles();
        if (this.showOnCenter) {
            return {
                ...baseStyle,
                top: 0,
                position: 'fixed',
                height: `${this.getSpaces().windowHeight}px`,
            };
        }
        return {
            ...baseStyle,
            top: this.parentBound.top - this.getSpaces().dropdownHeight,
        };
    }

    /**
     * createSpringStyles
     */
    public createSpringStyles() {
        if (this.showOnBottom) {
            return this.createStyleOnBottom();
        }
        if (this.showOnTop) {
            return this.createStyleOnTop();
        }
    }
}

export interface SplineProps extends Omit<CanvasHTMLAttributes, "onLoad" | "onMouseDown" | "onMouseUp" | "onMouseHover" | "onKeyDown" | "onKeyUp" | "onWheel"> {
    scene: string;
    styles?: Record<string, string>;
    onLoad?: (e: Application) => void;
    onMouseDown?: (e: SplineEvent) => void;
    onMouseUp?: (e: SplineEvent) => void;
    onMouseHover?: (e: SplineEvent) => void;
    onKeyDown?: (e: SplineEvent) => void;
    onKeyUp?: (e: SplineEvent) => void;
    onStart?: (e: SplineEvent) => void;
    onLookAt?: (e: SplineEvent) => void;
    onFollow?: (e: SplineEvent) => void;
    onWheel?: (e: SplineEvent) => void;
    autoRender?: boolean;
}
import { CanvasHTMLAttributes } from "@vue/runtime-dom";
import { Application } from "@splinetool/runtime";
import type { SplineEvent } from "@splinetool/runtime";
declare const _default: import("vue-demi").DefineComponent<{
    scene: {
        type: StringConstructor;
        required: true;
    };
    styles: {
        type: ObjectConstructor;
        default: () => {};
    };
    autoRender: {
        type: BooleanConstructor;
        default: boolean;
    };
    onLoad: FunctionConstructor;
    onMouseDown: FunctionConstructor;
    onMouseUp: FunctionConstructor;
    onMouseHover: FunctionConstructor;
    onKeyDown: FunctionConstructor;
    onKeyUp: FunctionConstructor;
    onStart: FunctionConstructor;
    onLookAt: FunctionConstructor;
    onFollow: FunctionConstructor;
    onWheel: FunctionConstructor;
}, {
    isLoading: import("vue-demi").Ref<boolean>;
    canvasRef: import("vue-demi").Ref<HTMLCanvasElement | undefined>;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {}, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    scene: {
        type: StringConstructor;
        required: true;
    };
    styles: {
        type: ObjectConstructor;
        default: () => {};
    };
    autoRender: {
        type: BooleanConstructor;
        default: boolean;
    };
    onLoad: FunctionConstructor;
    onMouseDown: FunctionConstructor;
    onMouseUp: FunctionConstructor;
    onMouseHover: FunctionConstructor;
    onKeyDown: FunctionConstructor;
    onKeyUp: FunctionConstructor;
    onStart: FunctionConstructor;
    onLookAt: FunctionConstructor;
    onFollow: FunctionConstructor;
    onWheel: FunctionConstructor;
}>>, {
    autoRender: boolean;
    styles: Record<string, any>;
}>;
export default _default;

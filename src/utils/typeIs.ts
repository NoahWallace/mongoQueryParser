export function typeIs (obj: any, type: string): boolean {
    switch ( type.toLowerCase() ) {
        case "string":
            return typeof obj === "string" || obj instanceof String;
        case "array":
            return Array.isArray(obj) || obj instanceof Array;
        case "object":
            return Object.prototype.toString.call(obj) === "[object Object]";
        case "null":
            return typeof obj === "object" && obj === null;
        case "undefined":
            return obj === void 0;
        case "function":
            return typeof obj === "function";
        case "boolean":
            return typeof obj === "boolean";
        case "number":
            return typeof obj === "number";
        case "symbol":
            return typeof obj === "symbol";
        case "date":
            return typeof obj === "object" && obj instanceof Date;
        default:
            return false;
    }
}

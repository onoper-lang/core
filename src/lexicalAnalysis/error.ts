export const ERROR = {
    INVALID_WHITESPACE: (line: number, length: number, identSize: number) =>
        `Invalid whitespace length at line ${line}: ${length} (expected multiple of ${identSize})`,
    NO_MATCH: (line: number, content: string) =>
        `No match found for line: ${line} - Content: "${content}"`,
    UNKNOWN_ELEMENT: (elementValue: string, line: number) =>
        `Unknown element: ${elementValue} at line ${line}`,
    NO_VALUE: (line: number) =>
        `No value found for line: ${line}`,
    CONFIG_REGEX_NOT_DEFINED: () =>
        `Config regex not defined`,
    FAILED_TO_PARSE_LINE: (lineIndex: number, content: string) =>
        `Failed to parse line ${lineIndex + 1}: ${content}`,
    INVALID_TOKEN: (line: number, token: string) =>
        `Invalid token "${token}" at line ${line}`,
}
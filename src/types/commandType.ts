export type CommandType = {
    cmd: string;
    desc: string;
    isFullScreen: boolean;
    isDisplayOuput: boolean;
};

export type CommandHistoryType = {
    cmd: string;
    timestamp: string;
};
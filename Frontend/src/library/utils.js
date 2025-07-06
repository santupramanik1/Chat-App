export const formatMessageTime = (createdAt) => {
    const date = new Date(createdAt);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    return `${hours}:${minutes}`;
};

// Convert seconds to MM:SS
export const formatOtpExpireTime = (time) => {
    const minute = String(Math.floor(time / 60)).padStart(2, "0");
    const second = String(Math.floor(time % 60)).padStart(2, "0");
    return `${minute}:${second}`;
};

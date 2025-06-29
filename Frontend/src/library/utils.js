export const formatMessageTime = (createdAt) => {
    const date = new Date(createdAt);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    return `${hours}:${minutes}`;
};

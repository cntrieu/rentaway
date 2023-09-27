export const getDateTime = () => {
    const today = new Date();
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    };
    
    const dateTime = today.toLocaleString("en-US", options);
    
    return dateTime;
};

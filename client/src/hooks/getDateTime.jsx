export const getDateTime = () => {
    const today = new Date();
    const f = new Intl.DateTimeFormat("en-us", {
        dateStyle: "short",
        timeStyle: "full",
    })
    
    return f.format(today)
}
export const isToday = (dateString: string) => {
    const target = parseDateAsLocal(dateString);
    const today = new Date();

    return (
        today.getFullYear() === target.getFullYear() &&
        today.getMonth() === target.getMonth() &&
        today.getDate() === target.getDate()
    );
};

const parseDateAsLocal = (fechaStr: string) => {
    const [year, month, day] = fechaStr.split('-').map(Number);
    return new Date(year, month - 1, day); // JS trata esto como local
};
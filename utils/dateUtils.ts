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

export function formatDateTimeForInput(datetime: string) {
    const [date, time] = datetime.split(' ');
    return `${date}T${time.slice(0, 5)}`;
}

export function formatDateForInput(date: string) {
    return date.split(' ')[0]; // Retorna solo la parte de la fecha
}

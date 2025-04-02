import { SelectItemGroup } from "primeng/api";

export const formatDate = (date: Date): string => {
    const weekday = new Intl.DateTimeFormat('es-ec', { weekday: "long" }).format(date);
    return weekday.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const capitalizeFirstLetter = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export const getAvailableHours = (start: string, end: string) => {
    const hours: { label: string; value: string }[] = [];

    for (let h = 6; h <= 20; h++) {
        const hourStr = h.toString().padStart(2, "0") + ":00";
        hours.push({ label: hourStr, value: hourStr });
    }

    return hours.filter(h => h.value >= start && h.value <= end);
}

export const formatTime = (time: string): string => {
    return time.split(":").slice(0, 2).join(":");
}

// Función que filtra horas mayores a la actual
export const filterHoursGreaterThanCurrentTime = (hours: SelectItemGroup[]): { label: string; items: { label: string; value: string }[] }[] => {
    const currentHour = new Date();
    const currentTime = currentHour.getHours() * 60 + currentHour.getMinutes(); // Obtener hora actual en minutos

    // Filtramos las horas dentro de cada grupo
    return hours
        .map(group => {
            const filteredItems = group.items.filter(item => {
                const itemTime = parseInt(item.value.split(":")[0]) * 60 + parseInt(item.value.split(":")[1]); // Convertir la hora del item a minutos
                return itemTime > currentTime; // Filtrar las horas futuras
            });

            // Solo devolvemos el grupo si tiene horas filtradas
            if (filteredItems.length > 0) {
                return { label: group.label, items: filteredItems };
            } else {
                return null; // Si no hay horas mayores, devolvemos null
            }
        })
        .filter(group => group !== null) as { label: string; items: { label: string; value: string }[] }[]; // Filtramos los `null`
}

export const filterHoursForSalida = (selectedTime: string, ingreso: SelectItemGroup[]): { label: string; items: { label: string; value: string }[] }[] => {
    // Convertir la hora seleccionada a minutos para facilitar la comparación
    const [selectedHour, selectedMinute] = selectedTime.split(":").map(Number);
    const selectedTimeInMinutes = selectedHour * 60 + selectedMinute;

    // Filtrar las horas disponibles en ingresoOpt (recorremos ingresoOpt)
    return ingreso.map(group => {
        const filteredItems = group.items.filter((item) => {
            const [itemHour, itemMinute] = item.value.split(":").map(Number);
            const itemTimeInMinutes = itemHour * 60 + itemMinute;

            return itemTimeInMinutes > selectedTimeInMinutes; // Solo horas mayores
        }).map(item => ({
            label: item.label ?? "", // Fallback to an empty string if label is undefined
            value: item.value
        }));

        return {
            label: group.label,
            items: filteredItems
        };
    }).filter(group => group.items.length > 0);
}

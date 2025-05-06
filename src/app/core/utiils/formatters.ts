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

export function generarRangoHoras(horaInicio: string, horaFin: string,
    rangoEnHoras: number // valor por defecto de 1 hora
  ): { label: string; value: string }[] {
    const [hInicio, mInicio] = horaInicio.split(":").map(Number);
  const [hFin, mFin] = horaFin.split(":").map(Number);

  const inicio = new Date();
  inicio.setHours(hInicio, mInicio, 0, 0);

  const fin = new Date();
  fin.setHours(hFin, mFin, 0, 0);

  const rangos: { label: string; value: string }[] = [];

  const minutosPorRango = rangoEnHoras * 60;

  while (inicio < fin) {
    const siguiente = new Date(inicio);
    siguiente.setMinutes(inicio.getMinutes() + minutosPorRango);

    // Evita incluir rangos que sobrepasen la hora de fin
    if (siguiente > fin) break;

    const horaDesde = inicio.toTimeString().slice(0, 5);
    const horaHasta = siguiente.toTimeString().slice(0, 5);

    const rangoTexto = `${horaDesde} - ${horaHasta}`;
    rangos.push({ label: rangoTexto, value: rangoTexto });

    inicio.setMinutes(inicio.getMinutes() + minutosPorRango);
  }

  return rangos;
}

export const formatForChart = (input: { rol: string; total: number }[]): { roles: string[]; data: number[] } => {
    const roles = Array.from(new Set(input.map(item => item.rol)));

    const data = roles.map(role => {
        const match = input.find(item => item.rol === role);
        return match ? Number(match.total) : 0;
    });

    return { roles, data };
};

export const formatDataByDia = (input: { rol: string; dia: string; total: number }[]): { dias: string[], datas: { label: string, data: number[] }[] } => {
    // Extraer los días únicos
    const dias = Array.from(new Set(input.map(item => item.dia)));

    // Obtener los roles únicos
    const roles = Array.from(new Set(input.map(item => item.rol)));

    // Crear el array de `datas` para cada rol
    const datas = roles.map(role => {
        const data = dias.map(dia => {
            const match = input.find(item => item.rol === role && item.dia === dia);
            return match ? match.total : 0;
        });
        return { label: role, data };
    });
    return { dias, datas };
}

export const formatAgendamientoData = (input: { dia: string; total: number }[]): { labels: string[], data: { label: string, data: number[] }[] } => {
    // Extraer los días únicos
    const labels = Array.from(new Set(input.map(item => item.dia)));

    const data = labels.map(dia => {
        const match = input.find(item => item.dia === dia);
        return match ? match.total : 0;
    });

    return { labels, data: [{ label: 'agendamiento', data }] };
}

export const transformAsistioData = (data: { asistio: string, total: number }[]): { labels: string[], data: number[] } => {
    const labels: string[] = [];
    const dataValues: number[] = [];

    // Iteramos sobre los datos y agregamos los valores correspondientes a las listas
    data.forEach(item => {
        labels.push(item.asistio);  // Asignamos el valor de 'asistio' a 'labels'
        dataValues.push(item.total); // Asignamos el valor de 'total' a 'data'
    });

    return {
        labels,
        data: dataValues
    };
}

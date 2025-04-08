export function imageToArrayBuffer(input: HTMLInputElement) {
  return new Promise((resolve, reject) => {
    const file = input.files ? input.files[0] : null; // Obtener el archivo seleccionado

      if (!file) {
        reject("No file selected");
        return;
      }

    const reader = new FileReader();

    reader.onloadend = function () {
      const arrayBuffer = reader.result; // El resultado es un ArrayBuffer
      resolve(arrayBuffer);
    };

    reader.onerror = function () {
      reject('Error reading the file');
    };

    reader.readAsArrayBuffer(file);
  });
}

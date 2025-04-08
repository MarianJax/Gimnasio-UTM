export function imageToArrayBuffer(input: HTMLInputElement) {
  return new Promise<{ buffer: ArrayBuffer; mimeType: string }>((resolve, reject) => {
    const file = input.files ? input.files[0] : null; // Obtener el archivo seleccionado

    if (!file) {
      reject("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = function () {
      const arrayBuffer = reader.result as ArrayBuffer; // El resultado es un ArrayBuffer
      const mimeType = file.type; // Obtener el tipo MIME del archivo
      resolve({ buffer: arrayBuffer, mimeType }); // Retornar ambos valores
    };

    reader.onerror = function () {
      reject('Error reading the file');
    };

    reader.readAsArrayBuffer(file);
  });
}

export function bufferToImage(buffer: any, type: string): string {
  const uint8Array = new Uint8Array(buffer);
    const binaryString = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
    return `data:${type};base64,${btoa(binaryString)}`;
}
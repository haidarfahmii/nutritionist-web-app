import { useState, useEffect } from "react";

/**
 * Hook kustom untuk menunda pembaruan nilai.
 * Sangat berguna untuk input pencarian agar tidak memanggil API di setiap ketukan.
 * @param value Nilai yang ingin ditunda (mis: searchQuery)
 * @param delay Waktu tunda dalam milidetik (mis: 500)
 * @returns Nilai yang sudah ditunda
 */
export function useDebounce<T>(value: T, delay: number): T {
  // State untuk menyimpan nilai yang sudah ditunda
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Atur timeout untuk memperbarui nilai
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Ini adalah fungsi cleanup
    // Ini akan berjalan setiap kali `value` atau `delay` berubah
    // Ini membatalkan timeout sebelumnya, jadi hanya timeout terakhir yang berjalan
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Hanya jalankan ulang efek jika value atau delay berubah

  return debouncedValue;
}

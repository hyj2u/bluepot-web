export function useCurrencyPrice(value: any) {
  const formattedValue = new Intl.NumberFormat("ko", {
    style: "decimal",
  }).format(value);

  return value ? formattedValue : 0;
}
//소수점 올림 처리
export function useCurrencyFloatPrice(value : any){
  const roundedValue = Math.ceil(value);
  const formattedValue = new Intl.NumberFormat("ko", {
    style: "decimal",
  }).format(roundedValue);
  return value ? formattedValue: 0;
}

export default function ThrowError(res) {
  if (
    res.payload.status === "fail" ||
    res.payload.status === "error" ||
    res.payload.status === "err"
  ) {
    throw res.payload;
  }
}

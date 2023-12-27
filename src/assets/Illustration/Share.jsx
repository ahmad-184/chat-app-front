export default function Share({ color, width, height, ...other }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "35"}
      height={height || "35"}
      fill={color || "#000000"}
      viewBox="0 0 256 256"
      {...other}
    >
      <path d="M237.66,106.35l-80-80A8,8,0,0,0,144,32V72.35c-25.94,2.22-54.59,14.92-78.16,34.91-28.38,24.08-46.05,55.11-49.76,87.37a12,12,0,0,0,20.68,9.58h0c11-11.71,50.14-48.74,107.24-52V192a8,8,0,0,0,13.66,5.65l80-80A8,8,0,0,0,237.66,106.35ZM160,172.69V144a8,8,0,0,0-8-8c-28.08,0-55.43,7.33-81.29,21.8a196.17,196.17,0,0,0-36.57,26.52c5.8-23.84,20.42-46.51,42.05-64.86C99.41,99.77,127.75,88,152,88a8,8,0,0,0,8-8V51.32L220.69,112Z"></path>
    </svg>
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    //   <rect width="256" height="256" fill="red" />
    //   <path
    //     d="M30.93,198.72C47.39,181.19,90.6,144,152,144v48l80-80L152,32V80C99.2,80,31.51,130.45,24,195.54A4,4,0,0,0,30.93,198.72Z"
    //     fill="none"
    //     stroke="currentColor"
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //     stroke-width="16"
    //   />
    // </svg>
  );
}

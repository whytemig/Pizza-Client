import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, type, onClick }) {
  //CUSTOMIZABLE BUTTON COMPONENT....
  //TOO MUCH IF STATEMENTS..... HOW WOULD I SIMPLIFIED THIS?
  let base =
    "tracking-wide  inline-block rounded-full text-stone-800 font-semibold uppercase bg-red-500 hover:bg-green-300 hover:text-white transition-colors ease-in duration-200 focus:outline-none focus:ring focus:ring-green-300 focus:ring-offset-2 text-sm";

  let styles = {
    primary: base + "py-3 px-4 md:px-6 md:py-4",
    small: base + "py-2 px-4 md:px-5 md:py-2.5 text-xs",
    round: base + " py-1 px-2.5 md:px-5 md:py-3.5 text-sm",
    secondary:
      "py-3 px-4 md:px-6 md:py-4 inline-block rounded-full text-stone-800 font-semibold uppercase hover:bg-stone-300 hover:text-black transition-colors ease-in duration-200 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 border-stone-500 border-2 text-sm",
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick) {
    return (
      <button className={styles[type]} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  }
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

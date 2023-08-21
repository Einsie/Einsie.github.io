// generic description box for text
export default function DescriptionBox({ children, style }) {
  return (<div className={`description-box ${style !== undefined ? style : ""}`}>
    {children}
  </div>);
}

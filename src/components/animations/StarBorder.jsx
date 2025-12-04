const StarBorder = ({
  as: Component = "div",
  className = "",
  color = "cyan",
  speed = "3s",
  children,
  ...rest
}) => {
  return (
    <Component
      className={`relative block overflow-hidden rounded-[20px] w-full p-[2px] transition-transform duration-300 hover:scale-105 ${className}`}
      style={{
        background: "transparent",
      }}
      {...rest}
    >
      {/* Bottom star animation - visible test */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "300%",
          height: "50%",
          bottom: "-11px",
          right: "-250%",
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          opacity: 0.9,
          animation: `star-movement-bottom ${speed} linear infinite alternate`,
        }}
      />

      {/* Top star animation - visible test */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "300%",
          height: "50%",
          top: "-10px",
          left: "-250%",
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          opacity: 0.9,
          animation: `star-movement-top ${speed} linear infinite alternate`,
        }}
      />

      {/* Content */}
      <div className="relative bg-card border border-border text-card-foreground rounded-[18px] px-6 py-4 hover:border-muted-foreground/50 transition-colors duration-300">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;

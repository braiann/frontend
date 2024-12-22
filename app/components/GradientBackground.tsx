const GradientBackground = () => {
    return (
        <div
            className="hidden sm:block"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1, // Ensure background is behind content
                backgroundColor: "hsla(224,25%,17%,1)",
                backgroundImage: `
                    radial-gradient(at 93% 60%, hsla(224,25%,17%,1) 0px, transparent 50%),
                    radial-gradient(at 96% 2%, hsla(335,85%,54%,1) 0px, transparent 50%),
                    radial-gradient(at 68% 94%, hsla(180,47%,30%,1) 0px, transparent 50%),
                    radial-gradient(at 98% 30%, hsla(335,85%,54%,1) 0px, transparent 50%),
                    radial-gradient(at 0% 75%, hsla(180,47%,30%,1) 0px, transparent 50%),
                    radial-gradient(at 49% 40%, hsla(224,25%,17%,1) 0px, transparent 50%),
                    radial-gradient(at 67% 0%, hsla(335,85%,54%,1) 0px, transparent 50%)`,

                backgroundSize: "150% 150%",
                filter: "blur(80px) saturate(0.3) brightness(2.5)",
                animation: "moveBackground 30s ease-in-out infinite",
            }}
        ></div>
    );
};

export default GradientBackground;

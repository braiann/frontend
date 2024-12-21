const Header = ({
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    children,
}: {
    h1?: boolean;
    h2?: boolean;
    h3?: boolean;
    h4?: boolean;
    h5?: boolean;
    h6?: boolean;
    children: React.ReactNode;
}) => {
    return h1 ? (
        <h1 className="text-4xl">{children}</h1>
    ) : h2 ? (
        <h2 className="mx-2 text-2xl font-bold mb-3 w-screen max-w-sm select-none">
            {children}
        </h2>
    ) : h3 ? (
        <h3 className="text-lg font-semibold">{children}</h3>
    ) : h4 ? (
        <h4>{children}</h4>
    ) : h5 ? (
        <h5>{children}</h5>
    ) : h6 ? (
        <h6>{children}</h6>
    ) : (
        <h1>{children}</h1>
    );
};

export default Header;

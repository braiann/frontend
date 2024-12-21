import Header from "./Header";

const AddMoreSections = (animatingOut: { animatingOut: boolean }) => {
    return (
        <section
            id="add-more-sections"
            className={`relative group animate-blur-zoom-in ${
                animatingOut ? "animate-blur-zoom-out" : ""
            }`}
        >
            <Header h2>Anything else?</Header>
        </section>
    );
};

export default AddMoreSections;

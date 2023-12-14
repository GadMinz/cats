import ContentLoader from "react-content-loader"

const CatsLoader = ({customClass= ""}) => (
    <ContentLoader
        speed={2}
        width={350}
        height={350}
        viewBox="0 0 350 350"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        className={customClass}
    >
        <rect x="0" y="0" rx="10" ry="10" width="350" height="350" />
    </ContentLoader>
)

export default CatsLoader